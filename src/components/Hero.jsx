"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, MoveRight } from "lucide-react";

import Container from "./Container";
import products from "../../database/products.json";

export default function Hero() {

  const heroProducts = products
    .filter(
      (product) =>
        product.featured && product.status === "active"
    )
    .slice(0, 4);

  const [currentIndex, setCurrentIndex] = useState(0);

  
  useEffect(() => {
    if (heroProducts.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === heroProducts.length - 1 ? 0 : prev + 1
      );
    }, 2000);

    return () => clearInterval(interval);
  }, [heroProducts.length]);

  const heroProduct = heroProducts[currentIndex];

  if (!heroProduct) return null;

  const productImage =
    heroProduct.thumbnail || heroProduct.images?.[0];

  const productNumber = String(currentIndex + 1).padStart(2, "0");
  const totalProducts = String(heroProducts.length).padStart(2, "0");

  return (
    <section className="overflow-hidden bg-[#f3f3ee]">
      <Container>
        <div className="relative grid min-h-[calc(100vh-108px)] items-center gap-10 py-12 lg:grid-cols-[1fr_0.85fr] lg:py-16">

          {/* Decorative Glow */}
          <div className="pointer-events-none absolute -left-32 top-20 size-80 rounded-full bg-lime-300/30 blur-3xl" />

          {/* 
              HERO CONTEN*/}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              ease: "easeOut",
            }}
            className="relative z-10"
          >
            {/* Badge */}
            <div className="mb-7 flex items-center gap-3">
              <span className="h-px w-10 bg-black/60" />

              <span className="text-xs font-bold uppercase tracking-[0.25em] text-black/60">
                New Season / 2026
              </span>
            </div>

            {/* Heading */}
            <h1 className="max-w-4xl text-[clamp(3.5rem,8vw,8rem)] font-black leading-[0.88] tracking-[-0.075em] text-black">
              Built for
              <br />
              the{" "}
              <span className="text-lime-500">
                everyday.
              </span>
            </h1>

            {/* Description */}
            <p className="mt-8 max-w-lg text-sm leading-7 text-black/70 sm:text-base">
              Elevated essentials designed for modern living.
              Discover footwear, clothing and accessories made
              to move with you.
            </p>

            {/* Buttons */}
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                href="/shop"
                className="group inline-flex h-13 items-center gap-4 rounded-full bg-black px-6 text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.03] hover:bg-black/90"
              >
                Shop collection

                <span className="flex size-8 items-center justify-center rounded-full bg-lime-400 text-black transition-transform duration-300 group-hover:rotate-45">
                  <ArrowUpRight size={16} />
                </span>
              </Link>

              <Link
                href="/shop?category=cat-001"
                className="group inline-flex items-center gap-2 px-3 text-sm font-semibold text-black/70 hover:text-black"
              >
                Explore sneakers

                <MoveRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-12 flex gap-8 border-t border-black/10 pt-6">
              <div>
                <p className="text-2xl font-black tracking-tight text-black">
                  8+
                </p>

                <p className="mt-1 text-[11px] font-medium uppercase tracking-wider text-black/50">
                  Products
                </p>
              </div>

              <div>
                <p className="text-2xl font-black tracking-tight text-black">
                  4.8
                </p>

                <p className="mt-1 text-[11px] font-medium uppercase tracking-wider text-black/50">
                  Avg. rating
                </p>
              </div>

              <div>
                <p className="text-2xl font-black tracking-tight text-black">
                  24/7
                </p>

                <p className="mt-1 text-[11px] font-medium uppercase tracking-wider text-black/50">
                  Support
                </p>
              </div>
            </div>
          </motion.div>

          {/* 
              HERO PRODUCT
           */}
          <motion.div
            key={heroProduct.id}
            initial={{
              opacity: 0,
              scale: 0.96,
              x: 25,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              x: 0,
            }}
            transition={{
              duration: 0.5,
              ease: "easeOut",
            }}
            className="relative mx-auto w-full max-w-xl"
          >
            <div className="relative aspect-[0.88] overflow-hidden rounded-4xl bg-[#deded7]">

              {/* Product Image */}
              <Image
                src={productImage}
                alt={heroProduct.name}
                fill
                priority={currentIndex === 0}
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />

              {/* Gradient */}
              <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />

              {/* Featured Badge */}
              <div className="absolute left-5 top-5 rounded-full bg-white/95 px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-black shadow-sm backdrop-blur">
                Featured
              </div>

              {/* Product Info */}
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">

                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-white/70">
                    {heroProduct.brand}
                  </p>

                  <h2 className="mt-1 text-xl font-bold text-white">
                    {heroProduct.name}
                  </h2>
                </div>

                {/* Product Link */}
                <Link
                  href={`/product/${heroProduct.slug}`}
                  className="flex size-12 items-center justify-center rounded-full bg-white text-black shadow-lg transition-all duration-300 hover:rotate-45 hover:bg-lime-400"
                  aria-label={`View ${heroProduct.name}`}
                >
                  <ArrowUpRight size={20} />
                </Link>
              </div>
            </div>

            {/* 
                DROP COUNTER
             */}
            <div className="absolute -bottom-4 -left-4 flex size-20 items-center justify-center rounded-full border border-black/5 bg-white shadow-xl">
              <div className="text-center">
                <p className="text-[10px] font-medium text-black/40">
                  DROP
                </p>

                <p className="text-sm font-black text-black">
                  {productNumber}/{totalProducts}
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </Container>
    </section>
  );
}