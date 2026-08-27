"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 lg:px-16">
        {/* Top */}
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr_1fr]">

          {/* Brand */}
          <div>
            <Link
              href="/"
              className="inline-block text-2xl font-black tracking-tight"
            >
              NEO<span className="text-lime-400">.</span>NEXOR
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-6 text-gray-400">
              Thoughtfully selected products for everyday life.
              Simple shopping, clean design and quality you can trust.
            </p>

            {/* Social */}
            <div className="mt-7 flex items-center gap-3">
              <a
                href="#"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-xs font-bold transition hover:border-lime-400 hover:bg-lime-400 hover:text-black"
              >
                IG
              </a>

              <a
                href="#"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-xs font-bold transition hover:border-lime-400 hover:bg-lime-400 hover:text-black"
              >
                FB
              </a>

              <a
                href="#"
                aria-label="Twitter"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-xs font-bold transition hover:border-lime-400 hover:bg-lime-400 hover:text-black"
              >
                X
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
              Shop
            </h3>

            <ul className="mt-5 space-y-3">
              <li>
                <Link
                  href="/shop"
                  className="text-sm text-gray-300 transition hover:text-lime-400"
                >
                  All Products
                </Link>
              </li>

              <li>
                <Link
                  href="/shop?category=cat-001"
                  className="text-sm text-gray-300 transition hover:text-lime-400"
                >
                  Sneakers
                </Link>
              </li>

              <li>
                <Link
                  href="/shop?category=cat-002"
                  className="text-sm text-gray-300 transition hover:text-lime-400"
                >
                  Clothing
                </Link>
              </li>

              <li>
                <Link
                  href="/shop?category=cat-003"
                  className="text-sm text-gray-300 transition hover:text-lime-400"
                >
                  Accessories
                </Link>
              </li>

              <li>
                <Link
                  href="/shop?category=cat-004"
                  className="text-sm text-gray-300 transition hover:text-lime-400"
                >
                  Watches
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
              Customer
            </h3>

            <ul className="mt-5 space-y-3">
              <li>
                <Link
                  href="/orders"
                  className="text-sm text-gray-300 transition hover:text-lime-400"
                >
                  My Orders
                </Link>
              </li>

              <li>
                <Link
                  href="/wishlist"
                  className="text-sm text-gray-300 transition hover:text-lime-400"
                >
                  Wishlist
                </Link>
              </li>

              <li>
                <Link
                  href="/cart"
                  className="text-sm text-gray-300 transition hover:text-lime-400"
                >
                  Cart
                </Link>
              </li>

              <li>
                <Link
                  href="/checkout"
                  className="text-sm text-gray-300 transition hover:text-lime-400"
                >
                  Checkout
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
              Company
            </h3>

            <ul className="mt-5 space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-sm text-gray-300 transition hover:text-lime-400"
                >
                  About
                </Link>
              </li>

              <li>
                <Link
                  href="/"
                  className="text-sm text-gray-300 transition hover:text-lime-400"
                >
                  Contact
                </Link>
              </li>

              <li>
                <Link
                  href="/"
                  className="text-sm text-gray-300 transition hover:text-lime-400"
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  href="/"
                  className="text-sm text-gray-300 transition hover:text-lime-400"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-16 rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:flex md:items-center md:justify-between md:p-8">
          <div>
            <p className="text-lg font-semibold">
              Stay in the loop.
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Get updates on new products and fresh drops.
            </p>
          </div>

          <div className="mt-5 flex w-full max-w-md overflow-hidden rounded-full border border-white/10 bg-white/5 md:mt-0">
            <input
              type="email"
              placeholder="Your email address"
              className="min-w-0 flex-1 bg-transparent px-5 py-3 text-sm text-white outline-none placeholder:text-gray-600"
            />

            <button
              type="button"
              className="flex items-center gap-2 bg-lime-400 px-5 py-3 text-xs font-bold text-black transition hover:bg-white"
            >
              Subscribe
              <ArrowUpRight size={15} />
            </button>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-7 text-xs text-gray-500 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Neo Nexor. All rights reserved.</p>

          <p>Designed for everyday living.</p>
        </div>
      </div>
    </footer>
  );
}