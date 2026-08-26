"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Check,
  Truck,
  Package,
} from "lucide-react";
import { useParams } from "next/navigation";
import { useStore } from "@/context/StoreContext";

export default function OrderDetailsPage() {
  const params = useParams();

  const { getOrderById } = useStore();

  const order = getOrderById(params.id);

  if (!order) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f8f8f5] px-6">
        <div className="text-center">
          <Package
            size={40}
            className="mx-auto text-gray-400"
          />

          <h1 className="mt-5 text-2xl font-black text-black">
            Order not found
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            We couldn't find this order.
          </p>

          <Link
            href="/orders"
            className="mt-6 inline-flex rounded-full bg-black px-6 py-3 text-sm font-semibold text-white"
          >
            Back to Orders
          </Link>
        </div>
      </main>
    );
  }

  const tracking = getTracking(order.status);

  return (
    <main className="min-h-screen bg-[#f8f8f5] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">

        {/* Back */}
        <Link
          href="/orders"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-black"
        >
          <ArrowLeft size={16} />
          Back to Orders
        </Link>

        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-400">
              Order Details
            </p>

            <h1 className="mt-2 text-3xl font-black text-black sm:text-4xl">
              {order.id}
            </h1>

            <p className="mt-2 text-sm text-gray-400">
              Placed on{" "}
              {new Date(
                order.date
              ).toLocaleDateString()}
            </p>
          </div>

          <StatusBadge
            status={order.status}
          />
        </div>

        {/* Tracking */}
        <section className="rounded-3xl bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-lime-100">
              <Truck
                size={20}
                className="text-lime-600"
              />
            </div>

            <div>
              <h2 className="font-bold text-black">
                Order Tracking
              </h2>

              <p className="text-sm text-gray-400">
                {tracking.message}
              </p>
            </div>
          </div>

          <div className="mt-8">
            {tracking.steps.map(
              (step, index) => {
                const completed =
                  index <= tracking.current;

                const isLast =
                  index ===
                  tracking.steps.length - 1;

                return (
                  <div
                    key={step.title}
                    className="relative flex gap-4"
                  >
                    {!isLast && (
                      <div
                        className={`absolute left-3.75 top-8 h-full w-px ${
                          index <
                          tracking.current
                            ? "bg-lime-300"
                            : "bg-gray-200"
                        }`}
                      />
                    )}

                    <div
                      className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                        completed
                          ? "bg-lime-400"
                          : "bg-gray-100"
                      }`}
                    >
                      <Check
                        size={16}
                        className={
                          completed
                            ? "text-black"
                            : "text-gray-400"
                        }
                      />
                    </div>

                    <div className="pb-8">
                      <h3
                        className={`font-bold ${
                          completed
                            ? "text-black"
                            : "text-gray-400"
                        }`}
                      >
                        {step.title}
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </section>

        {/* Items */}
        <section className="mt-6 rounded-3xl bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-xl font-bold text-black">
            Order Items
          </h2>

          <div className="mt-5 divide-y divide-gray-100">
            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 py-4"
              >
                <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-[#f3f3ee]">
                  {(item.thumbnail ||
                    item.image) && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={
                        item.thumbnail ||
                        item.image
                      }
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>

                <div className="flex-1">
                  <h3 className="font-bold text-black">
                    {item.name}
                  </h3>

                  <p className="mt-1 text-sm text-gray-400">
                    Quantity: {item.quantity}
                  </p>
                </div>

                <p className="font-bold text-black">
                  $
                  {Number(
                    item.salePrice ??
                      item.price ??
                      0
                  ).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom */}
        <div className="mt-6 grid gap-6 md:grid-cols-2">

          {/* Address */}
          <section className="rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="font-bold text-black">
              Shipping Address
            </h2>

            <p className="mt-4 text-sm font-semibold text-black">
              {order.customer?.name ||
                "Customer"}
            </p>

            <p className="mt-1 text-sm text-gray-500">
              {order.address?.address}
            </p>

            <p className="mt-1 text-sm text-gray-500">
              {order.address?.city}
              {order.address?.postalCode
                ? `, ${order.address.postalCode}`
                : ""}
            </p>

            <p className="mt-1 text-sm text-gray-500">
              {order.address?.country}
            </p>
          </section>

          {/* Summary */}
          <section className="rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="font-bold text-black">
              Order Summary
            </h2>

            <div className="mt-5 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">
                  Subtotal
                </span>

                <span className="font-medium text-gray-400">
                  $
                  {Number(
                    order.subtotal
                  ).toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-500">
                  Shipping
                </span>

                <span className="font-medium  text-gray-400">
                  {order.shipping === 0
                    ? "Free"
                    : `$${Number(
                        order.shipping
                      ).toFixed(2)}`}
                </span>
              </div>

              <div className="border-t border-gray-100 pt-4">
                <div className="flex justify-between">
                  <span className="font-bold text-gray-600">
                    Total
                  </span>

                  <span className="text-2xl font-black text-black">
                    $
                    {Number(
                      order.total
                    ).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </section>
        </div>
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
      className={`inline-flex w-fit rounded-full px-4 py-2 text-xs font-bold ${
        styles[status] ||
        "bg-gray-100 text-gray-600"
      }`}
    >
      {status}
    </span>
  );
}

function getTracking(status) {
  const steps = [
    {
      title: "Order Placed",
      description:
        "Your order has been received.",
    },
    {
      title: "Order Confirmed",
      description:
        "Your order has been confirmed.",
    },
    {
      title: "Shipped",
      description:
        "Your package is on the way.",
    },
    {
      title: "Delivered",
      description:
        "Your package has been delivered.",
    },
  ];

  if (status === "Cancelled") {
    return {
      current: 1,
      message:
        "This order has been cancelled.",
      steps: [
        steps[0],
        steps[1],
        {
          title: "Cancelled",
          description:
            "This order has been cancelled.",
        },
      ],
    };
  }

  if (status === "Returned") {
    return {
      current: 3,
      message:
        "This order has been returned.",
      steps: [
        ...steps,
        {
          title: "Returned",
          description:
            "The order has been returned.",
        },
      ],
    };
  }

  if (status === "Delivered") {
    return {
      current: 3,
      message:
        "Your order has been delivered.",
      steps,
    };
  }

  if (status === "Shipped") {
    return {
      current: 2,
      message:
        "Your order is on the way.",
      steps,
    };
  }

  return {
    current: 1,
    message:
      "Your order has been confirmed.",
    steps,
  };
}