"use client";

import { motion } from "framer-motion";

export default function PageLoader() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#f3f3ee]">
      <div className="flex flex-col items-center">

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-2xl font-black tracking-tight text-black"
        >
          NEO<span className="text-lime-500">.</span>NEXOR
        </motion.div>

        {/* Loader */}
        <div className="relative mt-8 h-1 w-32 overflow-hidden rounded-full bg-black/10">
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              duration: 1.4,
              ease: "easeInOut",
            }}
            className="absolute left-0 top-0 h-full w-1/2 rounded-full bg-lime-400"
          />
        </div>

        {/* Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-[10px] font-medium uppercase tracking-[0.25em] text-black/40"
        >
          Loading
        </motion.p>

      </div>
    </div>
  );
}