/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import products from "../../database/products.json";

const categories = [
  {
    id: "cat-001",
    name: "Sneakers",
    description: "Built to move with you.",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: "cat-002",
    name: "Clothing",
    description: "Everyday pieces, elevated.",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: "cat-003",
    name: "Accessories",
    description: "The details that complete it.",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: "cat-004",
    name: "Watches",
    description: "Timeless design, made modern.",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=85",
  },
];

export default function ShopByCategory() {
  return (
    <section className="bg-[#f5f5f0] px-6 py-20 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">

        {/* Section Header */}
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.3em] text-gray-400">
              Explore More
            </p>

            <h2 className="text-4xl font-bold tracking-tight text-black md:text-5xl">
              Shop by Category
            </h2>

            <p className="mt-4 max-w-md text-sm leading-6 text-gray-500">
              Explore everyday essentials designed for comfort, movement and
              modern living.
            </p>
          </div>

          <Link
            href="/shop"
            className="hidden items-center gap-2 text-sm font-semibold text-black transition hover:text-lime-600 md:flex"
          >
            Browse all
            <ArrowUpRight size={16} />
          </Link>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => {
            const productCount = products.filter(
              (product) =>
                product.categoryId === category.id &&
                product.status === "active"
            ).length;

            return (
              <Link
                key={category.id}
                href={`/shop?category=${category.id}`}
                className="group relative overflow-hidden rounded-2xl bg-black"
              >
                {/* Image */}
                <div className="aspect-4/5 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105 group-hover:opacity-80"
                  />
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

                {/* Content */}
                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <div className="flex items-end justify-between gap-3">
                    <div>
                      <p className="mb-1 text-[10px] uppercase tracking-[0.2em] text-white/60">
                        {productCount} Products
                      </p>

                      <h3 className="text-2xl font-bold">
                        {category.name}
                      </h3>

                      <p className="mt-1 text-xs text-white/70">
                        {category.description}
                      </p>
                    </div>

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-black transition duration-300 group-hover:bg-lime-400 group-hover:rotate-45">
                      <ArrowUpRight size={17} />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Mobile Browse Button */}
        <div className="mt-8 flex justify-center md:hidden">
          <Link
            href="/shop"
            className="flex items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-lime-400 hover:text-black"
          >
            Browse All Products
            <ArrowUpRight size={16} />
          </Link>
        </div>

      </div>
    </section>
  );
}