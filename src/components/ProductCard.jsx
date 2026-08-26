"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export default function ProductCard({ product }) {
  const {
    id,
    slug,
    name,
    price,
    salePrice,
    rating,
    reviewCount,
    thumbnail,
    category,
    isNew,
    isOnSale,
  } = product;

  const [isWishlisted, setIsWishlisted] = useState(false);

  const currentPrice = salePrice ?? price;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group relative overflow-hidden rounded-2xl bg-white transition-all hover:shadow-lg hover:shadow-black/5"
    >
      {/* Image */}
      <Link href={`/product/${slug}`}>
        <div className="relative aspect-square overflow-hidden bg-[#f3f3ee]">
          <Image
            src={thumbnail}
            alt={name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Badges */}
          <div className="absolute left-3 top-3 flex flex-col gap-1.5">
            {isNew && (
              <span className="rounded-full bg-black px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                New
              </span>
            )}

            {isOnSale && salePrice && (
              <span className="rounded-full bg-lime-400 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-black">
                Sale
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* Wishlist */}
      <button
        type="button"
        onClick={() => setIsWishlisted((prev) => !prev)}
        className="absolute right-3 top-3 rounded-full bg-white/90 p-2.5 backdrop-blur transition-all hover:bg-white hover:shadow-md"
        aria-label={
          isWishlisted
            ? `Remove ${name} from wishlist`
            : `Add ${name} to wishlist`
        }
      >
        <Heart
          size={16}
          className={
            isWishlisted
              ? "fill-red-500 text-red-500"
              : "text-gray-600"
          }
        />
      </button>

      {/* Content */}
      <div className="p-4">
        {/* Category + Rating */}
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
            {category}
          </p>

          <div className="flex shrink-0 items-center gap-1">
            <Star
              size={13}
              className="fill-lime-400 text-lime-400"
            />

            <span className="text-sm font-semibold text-black">
              {rating}
            </span>

            <span className="text-xs text-gray-400">
              ({reviewCount})
            </span>
          </div>
        </div>

        {/* Name */}
        <Link href={`/product/${slug}`}>
          <h3 className="mt-2 line-clamp-1 text-base font-bold text-black transition-colors hover:text-lime-600">
            {name}
          </h3>
        </Link>

        {/* Price */}
        <div className="mt-2 flex items-center gap-2">
          <span className="text-lg font-bold text-black">
            ${currentPrice}
          </span>

          {salePrice && (
            <span className="text-sm text-gray-400 line-through">
              ${price}
            </span>
          )}
        </div>

        {/* Add to Cart */}
        <button
          type="button"
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-black py-2.5 text-sm font-semibold text-white transition-all hover:bg-lime-400 hover:text-black"
        >
          <ShoppingBag size={16} />
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
}