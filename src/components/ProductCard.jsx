"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Star, ArrowUpRight } from "lucide-react";

export default function ProductCard({ product }) {
  const displayPrice = product.salePrice ?? product.price;

  return (
    <article className="group">
      <div className="relative overflow-hidden rounded-2xl bg-[#eeeeea]">
        <Link href={`/shop/${product.slug}`}>
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src={product.thumbnail || product.images?.[0]}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </Link>

        {/* Badges */}
        <div className="absolute left-4 top-4 flex flex-col gap-2">
          {product.isNew && (
            <span className="rounded-full bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider">
              New
            </span>
          )}

          {product.isOnSale && (
            <span className="rounded-full bg-lime-400 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider">
              Sale
            </span>
          )}
        </div>

        {/* Wishlist */}
        <button
          type="button"
          aria-label={`Add ${product.name} to wishlist`}
          className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-full bg-white/90 backdrop-blur transition-transform hover:scale-105"
        >
          <Heart size={17} strokeWidth={1.8} />
        </button>

        {/* Quick action */}
        <Link
          href={`/shop/${product.slug}`}
          aria-label={`View ${product.name}`}
          className="absolute bottom-4 right-4 flex size-11 translate-y-2 items-center justify-center rounded-full bg-black text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
        >
          <ArrowUpRight size={18} />
        </Link>
      </div>

      {/* Product information */}
      <div className="pt-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-black/40">
              {product.brand}
            </p>

            <Link href={`/shop/${product.slug}`}>
              <h3 className="mt-1 text-sm font-semibold transition-opacity hover:opacity-60">
                {product.name}
              </h3>
            </Link>
          </div>

          <div className="text-right">
            {product.salePrice ? (
              <>
                <p className="text-sm font-bold">
                  ${product.salePrice.toFixed(2)}
                </p>

                <p className="text-xs text-black/35 line-through">
                  ${product.price.toFixed(2)}
                </p>
              </>
            ) : (
              <p className="text-sm font-bold">
                ${product.price.toFixed(2)}
              </p>
            )}
          </div>
        </div>

        {/* Rating */}
        <div className="mt-3 flex items-center gap-1.5">
          <Star
            size={13}
            fill="currentColor"
            className="text-black"
          />

          <span className="text-xs font-medium">
            {product.rating}
          </span>

          <span className="text-xs text-black/35">
            ({product.reviewCount})
          </span>
        </div>
      </div>
    </article>
  );
}