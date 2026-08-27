/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { ArrowUpRight, Heart, ShoppingBag } from "lucide-react";
import products from "../../database/products.json";
import { useStore } from "@/context/StoreContext";

export default function FeaturedProducts() {
  const { addToCart, toggleWishlist, isInWishlist } = useStore();

  const featuredProducts = products
    .filter((product) => product.featured && product.status === "active")
    .slice(0, 4);

  return (
    <section className="bg-white px-6 py-20 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-10 text-center">
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.3em] text-gray-400">
            Our Selection
          </p>

          <h2 className="text-4xl font-bold tracking-tight text-black md:text-5xl">
            Featured Products
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-gray-500">
            Discover our most loved pieces, selected for everyday comfort,
            style and movement.
          </p>
        </div>

        {/* Product Grid */}
        {featuredProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">

            {featuredProducts.map((product) => {
              const price = product.salePrice || product.price;
              const hasSale = product.salePrice !== null;

              return (
                <div key={product.id} className="group">

                  {/* Image */}
                  <div className="relative aspect-4/5 overflow-hidden rounded-2xl bg-[#f3f3ee]">

                    <Link href={`/product/${product.slug}`}>
                      <img
                        src={product.thumbnail || product.images?.[0]}
                        alt={product.name}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    </Link>

                    {/* Sale Badge */}
                    {hasSale && (
                      <span className="absolute left-3 top-3 rounded-full bg-lime-400 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-black">
                        Sale
                      </span>
                    )}

                    {/* Wishlist */}
                    <button
                      type="button"
                      onClick={() => toggleWishlist(product)}
                      className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 shadow-sm transition hover:scale-105"
                      aria-label="Add to wishlist"
                    >
                      <Heart
                        size={17}
                        className={
                          isInWishlist(product.id)
                            ? "fill-red-500 text-red-500"
                            : "text-gray-700"
                        }
                      />
                    </button>

                    {/* Add to Cart */}
                    <button
                      type="button"
                      onClick={() => addToCart(product)}
                      className="absolute bottom-3 left-3 right-3 flex items-center justify-center gap-2 rounded-full bg-black py-3 text-xs font-semibold text-white opacity-0 transition duration-300 hover:bg-lime-400 hover:text-black group-hover:opacity-100"
                    >
                      <ShoppingBag size={15} />
                      Add to Cart
                    </button>
                  </div>

                  {/* Product Info */}
                  <div className="pt-4">

                    <p className="mb-1 text-[10px] font-medium uppercase tracking-[0.18em] text-gray-400">
                      {product.category}
                    </p>

                    <Link href={`/product/${product.slug}`}>
                      <h3 className="line-clamp-1 text-sm font-semibold text-black transition hover:text-lime-600">
                        {product.name}
                      </h3>
                    </Link>

                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-sm font-bold text-black">
                        ${price.toFixed(2)}
                      </span>

                      {hasSale && (
                        <span className="text-xs text-gray-400 line-through">
                          ${product.price.toFixed(2)}
                        </span>
                      )}
                    </div>

                  </div>
                </div>
              );
            })}

          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-200 py-16 text-center">
            <p className="text-sm text-gray-500">
              No featured products available.
            </p>
          </div>
        )}

        {/* View All */}
        <div className="mt-12 flex justify-center">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 rounded-full bg-black px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-lime-400 hover:text-black"
          >
            View All Products
            <ArrowUpRight size={16} />
          </Link>
        </div>

      </div>
    </section>
  );
}