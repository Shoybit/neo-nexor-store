"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Container from "./Container";

const announcements = [
  "✨ Free shipping on orders over $100",
  "🎉 New arrivals — up to 50% off",
  "🔥 Limited time: Buy 2 Get 1 Free",
];

export default function AnnouncementBar() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-black text-white">
      <Container>
        <div className="flex min-h-10 items-center justify-center gap-4 py-1.5">
          {/* Text */}
          <div className="flex-1 overflow-hidden text-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={currentIndex}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="text-xs font-medium tracking-wide sm:text-sm"
              >
                {announcements[currentIndex]}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Dots */}
          <div className="flex gap-1.5">
            {announcements.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`
                  h-1.5 rounded-full transition-all duration-300
                  ${
                    index === currentIndex
                      ? "w-4 bg-lime-400"
                      : "w-1.5 bg-white/30 hover:bg-white/50"
                  }
                `}
                aria-label={`Go to announcement ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}