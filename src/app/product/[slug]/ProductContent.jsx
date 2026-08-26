"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import {
  ArrowLeft,
  Heart,
  Minus,
  Plus,
  ShoppingBag,
  Star,
  Check,
} from "lucide-react";
import { motion } from "framer-motion";

export default function ProductContent({ product }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const sizeVariant = product.variants?.find(
    (variant) => variant.type === "size"
  );

  const colorVariant = product.variants?.find(
    (variant) => variant.type === "color"
  );

  const [selectedSize, setSelectedSize] = useState(
    sizeVariant?.options?.[0] || null
  );

  const [selectedColor, setSelectedColor] = useState(
    colorVariant?.options?.[0] || null
  );

  const currentPrice = product.salePrice ?? product.price;

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const {
  addToCart,
  toggleWishlist,
  isInWishlist,
} = useStore();

const wishlisted = isInWishlist(product.id);

  return (
    <main className="min-h-screen bg-[#f8f8f5]">
      {/* Back to Shop */}
      <div className="border-b border-black/5 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-4 sm:px-8">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-black"
          >
            <ArrowLeft size={16} />
            Back to shop
          </Link>
        </div>
      </div>

      {/* Product Section */}
      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* ================= IMAGE GALLERY ================= */}
          <div>
            {/* Main Image */}
            <motion.div
              key={selectedImage}
              initial={{ opacity: 0.7 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="relative aspect-square overflow-hidden rounded-[1.5rem] bg-[#eeeeea]"
            >
              <Image
                src={product.images?.[selectedImage] || product.image}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />

              {/* Product Badges */}
              <div className="absolute left-4 top-4 flex flex-col gap-2">
                {product.isNew && (
                  <span className="rounded-full bg-black px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
                    New
                  </span>
                )}
                {product.isSale && (
                  <span className="rounded-full bg-lime-400 px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-black shadow-sm">
                    Sale
                  </span>
                )}
              </div>
            </motion.div>

            {/* Thumbnails */}
            {product.images?.length > 1 && (
              <div className="mt-4 grid grid-cols-4 gap-3">
                {product.images.map((image, index) => (
                  <button
                    key={`${image}-${index}`}
                    type="button"
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-square overflow-hidden rounded-xl bg-[#eeeeea] transition-all ${
                      selectedImage === index
                        ? "ring-2 ring-black ring-offset-2"
                        : "opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      sizes="120px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ================= PRODUCT INFO ================= */}
          <div className="flex flex-col justify-center">
            {/* Category */}
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-400">
              {product.category}
            </p>

            {/* Product Name */}
            <h1 className="mt-3 text-4xl font-black tracking-[-0.05em] text-black sm:text-5xl">
              {product.name}
            </h1>

            {/* Brand */}
            <p className="mt-3 text-sm text-gray-500">
              by{" "}
              <span className="font-semibold text-black">
                {product.brand}
              </span>
            </p>

            {/* Rating */}
            <div className="mt-5 flex items-center gap-3">
              <div className="flex items-center gap-1">
                <Star
                  size={17}
                  className="fill-lime-400 text-lime-400"
                />
                <span className="font-semibold text-black">
                  {product.rating}
                </span>
              </div>
              <span className="text-sm text-gray-400">
                {product.reviews || product.reviewCount} reviews
              </span>
            </div>

            {/* Price */}
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <span className="text-3xl font-black text-black">
                ${currentPrice}
              </span>
              {product.salePrice && (
                <span className="text-lg text-gray-400 line-through">
                  ${product.price}
                </span>
              )}
              {product.salePrice && (
                <span className="rounded-full bg-lime-100 px-3 py-1 text-xs font-bold text-lime-700">
                  Save ${(product.price - product.salePrice).toFixed(0)}
                </span>
              )}
            </div>

            {/* Short Description */}
            {product.shortDescription && (
              <p className="mt-4 text-sm font-medium text-gray-500">
                {product.shortDescription}
              </p>
            )}

            {/* Description */}
            <p className="mt-4 max-w-xl text-sm leading-7 text-gray-600">
              {product.description}
            </p>

            <div className="my-7 h-px bg-black/10" />

            {/* ================= COLOR ================= */}
            {colorVariant && (
              <div>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-bold text-black">Color</p>
                  <span className="text-sm text-gray-500">
                    {selectedColor}
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {colorVariant.options.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setSelectedColor(color)}
                      className={`rounded-full border px-5 py-2.5 text-sm font-medium transition-all ${
                        selectedColor === color
                          ? "border-black bg-black text-white"
                          : "border-gray-200 bg-white text-gray-700 hover:border-black"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ================= SIZE ================= */}
            {sizeVariant && (
              <div className="mt-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-bold text-black">Size</p>
                  <button
                    type="button"
                    className="text-xs font-medium text-gray-500 underline hover:text-black"
                  >
                    Size guide
                  </button>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {sizeVariant.options.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-12 rounded-full border px-4 py-2.5 text-sm font-medium transition-all ${
                        selectedSize === size
                          ? "border-black bg-black text-white"
                          : "border-gray-200 bg-white text-gray-700 hover:border-black"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ================= STOCK ================= */}
            <div className="mt-6 flex items-center gap-2 text-sm">
              <span
                className={`h-2 w-2 rounded-full ${
                  product.stock > 0 ? "bg-green-500" : "bg-red-500"
                }`}
              />
              {product.stock > 0 ? (
                <span className="text-gray-600">
                  In stock — {product.stock} available
                </span>
              ) : (
                <span className="text-red-500">Out of stock</span>
              )}
            </div>

            {/* ================= QUANTITY + CART ================= */}
            <div className="mt-7 flex gap-3">
              {/* Quantity */}
              <div className="flex items-center rounded-full border border-gray-200 bg-white">
                <button
                  type="button"
                  onClick={decreaseQuantity}
                  disabled={quantity === 1}
                  className="p-3.5 text-gray-400 transition-colors hover:text-black disabled:opacity-30"
                >
                  <Minus size={16} />
                </button>
                <span className="w-8 text-center text-sm font-semibold text-black">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={increaseQuantity}
                  disabled={quantity >= product.stock || product.stock === 0}
                  className="p-3.5 text-gray-400 transition-colors hover:text-black disabled:opacity-30"
                >
                  <Plus size={16} />
                </button>
              </div>

              {/* Add to Cart */}
              <button
                type="button"
                onClick={() => addToCart(product)}
                disabled={product.stock === 0}
                className="flex flex-1 items-center justify-center gap-2 rounded-full bg-black px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-lime-400 hover:text-black disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
              >
                <ShoppingBag size={18} />
                Add to Cart
              </button>

              {/* Wishlist */}
              <button
                type="button"
                onClick={() => toggleWishlist(product)}
                className="rounded-full border border-gray-200 bg-white p-4 transition-all hover:border-black"
                aria-label="Add to wishlist"
              >
                <Heart
    size={20}
    className={
      wishlisted
        ? "fill-red-500 text-red-500"
        : "text-black"
    }
                />
              </button>
            </div>

            {/* ================= PRODUCT DETAILS ================= */}
            <div className="mt-8 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-white p-4 shadow-sm">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                  SKU
                </p>
                <p className="mt-1 text-sm font-semibold text-black">
                  {product.sku}
                </p>
              </div>
              <div className="rounded-2xl bg-white p-4 shadow-sm">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                  Brand
                </p>
                <p className="mt-1 text-sm font-semibold text-black">
                  {product.brand}
                </p>
              </div>
            </div>

            {/* ================= BENEFITS ================= */}
            <div className="mt-6 space-y-3">
              {[
                "Free shipping on orders over $100",
                "30-day easy returns",
                "Secure checkout",
              ].map((text) => (
                <div
                  key={text}
                  className="flex items-center gap-3 text-sm text-gray-600"
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-lime-400">
                    <Check size={12} className="text-black" />
                  </span>
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}