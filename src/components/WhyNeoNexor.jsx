"use client";

import { motion } from "framer-motion";
import { 
  ArrowUpRight, 
  Box, 
  Heart, 
  ShieldCheck, 
  Sparkles,
  ChevronRight,
  Star,
  TrendingUp,
  Clock
} from "lucide-react";
import Link from "next/link";

const benefits = [
  {
    number: "01",
    icon: Sparkles,
    title: "Built for Everyday",
    description:
      "Comfort-first products designed to fit naturally into your everyday life.",
  },
  {
    number: "02",
    icon: ShieldCheck,
    title: "Curated Quality",
    description:
      "A focused selection of products chosen for quality, style and lasting value.",
  },
  {
    number: "03",
    icon: Box,
    title: "Fast & Reliable",
    description:
      "Simple shopping, secure checkout and reliable delivery from start to finish.",
  },
  {
    number: "04",
    icon: Heart,
    title: "Made to Keep",
    description:
      "Thoughtful products designed to become part of your everyday essentials.",
  },
];

// স্ট্যাটিস্টিক্স ডেটা
const stats = [
  { value: "10K+", label: "Happy Customers" },
  { value: "4.8", label: "Average Rating" },
  { value: "99%", label: "Satisfaction Rate" },
  { value: "24/7", label: "Customer Support" },
];

export default function WhyNeoNexor() {
  // এনিমেশন ভেরিয়েন্ট
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="relative bg-[#f3f3ee] px-5 py-16 md:px-8 md:py-20 lg:px-12">
      {/* Background Decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full bg-lime-200/10 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-[500px] w-[500px] rounded-full bg-black/5 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* ============ HEADER ============ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid gap-6 md:grid-cols-[1fr_1.2fr] md:items-end md:gap-8"
        >
          <div>
            <div className="mb-3 flex items-center gap-2">
              <Sparkles size={14} className="text-lime-400" />
              <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-gray-500">
                Why Neo Nexor
              </p>
            </div>

            <h2 className="max-w-xl text-3xl font-black tracking-tight text-black md:text-4xl lg:text-5xl">
              More than products.
              <br />
              <span className="text-gray-400">A better way to shop.</span>
            </h2>
          </div>

          <p className="max-w-lg text-sm leading-7 text-gray-600 md:ml-auto">
            We keep things simple — thoughtfully selected products,
            effortless shopping and an experience designed around you.
          </p>
        </motion.div>

        {/* ============ BENEFITS GRID ============ */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-black/10 bg-black/10 md:grid-cols-2 lg:grid-cols-4"
        >
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;

            return (
              <motion.div
                key={benefit.number}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                className="group bg-[#f3f3ee] p-6 transition-all duration-300 hover:bg-white hover:shadow-lg sm:p-7 md:p-8"
              >
                {/* Top */}
                <div className="flex items-start justify-between">
                  <span className="text-xs font-bold text-gray-400">
                    {benefit.number}
                  </span>

                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white transition-all duration-300 group-hover:border-lime-400 group-hover:bg-lime-400"
                  >
                    <Icon 
                      size={17} 
                      className="text-gray-600 transition-colors group-hover:text-black" 
                    />
                  </motion.div>
                </div>

                {/* Content */}
                <div className="mt-10">
                  <h3 className="text-lg font-bold text-black">
                    {benefit.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    {benefit.description}
                  </p>
                </div>

                {/* Arrow */}
                <div className="mt-6">
                  <ArrowUpRight
                    size={18}
                    className="text-gray-300 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-lime-500"
                  />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ============ STATS ============ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-10 grid grid-cols-2 gap-3 rounded-3xl bg-white/80 p-6 backdrop-blur sm:grid-cols-4 sm:gap-4 sm:p-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="text-center"
            >
              <p className="text-2xl font-black text-black sm:text-3xl">
                {stat.value}
              </p>
              <p className="mt-1 text-xs font-medium text-gray-500">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* ============ BOTTOM CTA ============ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-8 flex flex-col gap-4 rounded-3xl bg-black px-6 py-8 text-white md:flex-row md:items-center md:justify-between md:px-10 md:py-10"
        >
          <div>
            <div className="flex items-center gap-2">
              <Sparkles size={14} className="text-lime-400" />
              <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-gray-400">
                The Neo Nexor Standard
              </p>
            </div>
            <p className="mt-2 text-lg font-semibold md:text-xl">
              Good products. Clean design. No unnecessary noise.
            </p>
          </div>

          <Link
            href="/shop"
            className="group inline-flex items-center gap-2 rounded-full bg-lime-400 px-6 py-3 text-sm font-bold text-black transition-all hover:bg-white hover:scale-[1.02]"
          >
            Shop now
            <ChevronRight 
              size={18} 
              className="transition-transform group-hover:translate-x-1" 
            />
          </Link>
        </motion.div>

        {/* ============ TRUST INDICATORS ============ */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs font-medium text-gray-500"
        >
          <div className="flex items-center gap-1.5">
            <Star size={14} className="text-lime-500" />
            <span>4.8 avg. rating</span>
          </div>
          <div className="flex items-center gap-1.5">
            <TrendingUp size={14} className="text-lime-500" />
            <span>Trending now</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock size={14} className="text-lime-500" />
            <span>Updated weekly</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}