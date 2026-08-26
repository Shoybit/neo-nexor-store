/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import {
  Package,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";
import { useState } from "react";
import { useStore } from "@/context/StoreContext";

const statuses = [
  "All",
  "Pending",
  "Delivered",
  "Cancelled",
  "Returned",
];

export default function OrdersPage() {
  const { orders } = useStore();

  const [activeStatus, setActiveStatus] =
    useState("All");

  const filteredOrders =
    activeStatus === "All"
      ? orders
      : orders.filter(
          (order) => order.status === activeStatus
        );

  return (
    <main className="min-h-screen bg-[#f8f8f5] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">

        {/* Back */}
        <Link
          href="/shop"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-black"
        >
          <ArrowLeft size={16} />
          Back to Shop
        </Link>

        {/* Header */}
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-400">
            Account
          </p>

          <h1 className="mt-2 text-4xl font-black tracking-tight text-black sm:text-5xl">
            My Orders
          </h1>

          <p className="mt-3 text-sm text-gray-500">
            View your orders and track their delivery status.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-wrap gap-2">
          {statuses.map((status) => (
            <button
              key={status}
              type="button"
              onClick={() =>
                setActiveStatus(status)
              }
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                activeStatus === status
                  ? "bg-black text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Empty */}
        {filteredOrders.length === 0 ? (
          <div className="rounded-3xl bg-white px-6 py-24 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
              <Package
                size={26}
                className="text-gray-400"
              />
            </div>

            <h2 className="mt-5 text-xl font-bold text-black">
              {orders.length === 0
                ? "No orders yet"
                : "No orders found"}
            </h2>

            <p className="mt-2 text-sm text-gray-400">
              {orders.length === 0
                ? "Your completed orders will appear here."
                : "There are no orders with this status."}
            </p>

            {orders.length === 0 && (
              <Link
                href="/shop"
                className="mt-6 inline-flex rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-lime-400 hover:text-black"
              >
                Start Shopping
              </Link>
            )}
          </div>
        ) : (
          /* Orders */
          <div className="space-y-5">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className="rounded-3xl bg-white p-5 shadow-sm sm:p-6"
              >

                {/* Header */}
                <div className="flex flex-col gap-4 border-b border-gray-100 pb-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-gray-400">
                      Order ID
                    </p>

                    <h2 className="mt-1 font-bold text-black">
                      {order.id}
                    </h2>

                    <p className="mt-1 text-sm text-gray-400">
                      {formatDate(order.date)}
                    </p>
                  </div>

                  <StatusBadge
                    status={order.status}
                  />
                </div>

                {/* Items */}
                <div className="py-5">
                  {order.items.map(
                    (item, index) => (
                      <div
                        key={`${item.id}-${index}`}
                        className="flex items-center gap-4 py-2"
                      >
                        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-[#f3f3ee]">
                          {item.thumbnail ||
                          item.image ? (
                            <img
                              src={
                                item.thumbnail ||
                                item.image
                              }
                              alt={item.name}
                              className="h-full w-full object-cover"
                            />
                          ) : null}
                        </div>

                        <div className="min-w-0 flex-1">
                          <h3 className="truncate text-sm font-bold text-black">
                            {item.name}
                          </h3>

                          <p className="mt-1 text-xs text-gray-400">
                            Qty: {item.quantity}
                          </p>
                        </div>

                        <p className="text-sm font-bold text-black">
                          $
                          {Number(
                            item.salePrice ??
                              item.price ??
                              0
                          ).toFixed(2)}
                        </p>
                      </div>
                    )
                  )}
                </div>

                {/* Footer */}
                <div className="flex flex-col gap-4 border-t border-gray-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <span className="text-sm text-gray-400">
                      Order total
                    </span>

                    <p className="mt-1 text-xl font-black text-black">
                      $
                      {Number(
                        order.total
                      ).toFixed(2)}
                    </p>
                  </div>

                  <Link
                    href={`/orders/${order.id}`}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-lime-400 hover:text-black"
                  >
                    View Details
                    <ChevronRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

function StatusBadge({ status }) {
  const styles = {
    Pending:
      "bg-yellow-100 text-yellow-700",
    Delivered:
      "bg-lime-100 text-lime-700",
    Cancelled:
      "bg-red-100 text-red-600",
    Returned:
      "bg-purple-100 text-purple-600",
  };

  return (
    <span
      className={`inline-flex rounded-full px-4 py-2 text-xs font-bold ${
        styles[status] ||
        "bg-gray-100 text-gray-600"
      }`}
    >
      {status}
    </span>
  );
}

function formatDate(date) {
  return new Date(date).toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    }
  );
}