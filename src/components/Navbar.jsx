"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useState, useEffect } from "react";
import Container from "./Container";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const total = cart.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(total);
    };
    updateCartCount();
    window.addEventListener("storage", updateCartCount);
    return () => window.removeEventListener("storage", updateCartCount);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Shop" },
    { href: "/shop?category=sneakers", label: "Sneakers" },
    { href: "/shop?category=clothing", label: "Clothing" },
  ];

  const isActive = (href) => {
    if (href === "/") return pathname === href;
    return pathname.startsWith(href.split("?")[0]);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`
        sticky top-0 z-50 
        transition-all duration-300 
        ${
          scrolled
            ? "border-b border-gray-200/50 bg-white/95 shadow-sm backdrop-blur-lg"
            : "bg-white/90 backdrop-blur-sm"
        }
      `}
    >
      <Container>
        <div className="flex h-16 items-center justify-between gap-4 sm:h-18 md:gap-6">
          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={() => setOpen(!open)}
            className="flex size-10 items-center justify-center rounded-full transition-colors hover:bg-gray-100 lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={open ? "close" : "menu"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {open ? (
                  <X size={20} className="text-gray-800" />
                ) : (
                  <Menu size={20} className="text-gray-800" />
                )}
              </motion.div>
            </AnimatePresence>
          </motion.button>

          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-black tracking-[-0.06em] transition-opacity hover:opacity-80 sm:text-2xl"
          >
            <span className="text-gray-900">NEO</span>
            <span className="text-lime-500">·</span>
            <span className="text-gray-900">NEXOR</span>
          </Link>

          {/* Desktop Navigation*/}
          <nav className="hidden items-center gap-6 lg:flex xl:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`
                  relative text-sm font-medium transition-colors duration-200
                  ${
                    isActive(link.href)
                      ? "text-gray-900"
                      : "text-gray-600 hover:text-gray-900"
                  }
                `}
              >
                {link.label}
                {isActive(link.href) && (
                  <motion.span
                    layoutId="active-nav-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-lime-500"
                    transition={{ duration: 0.3 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Action Buttons*/}
          <div className="flex items-center gap-0.5 sm:gap-1">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.92 }}
              className="hidden size-10 items-center justify-center rounded-full transition-colors hover:bg-gray-100 sm:flex"
              aria-label="Search"
            >
              <Search size={19} strokeWidth={1.8} className="text-gray-700" />
            </motion.button>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.92 }}
            >
              <Link
                href="/wishlist"
                className="hidden size-10 items-center justify-center rounded-full transition-colors hover:bg-gray-100 sm:flex"
                aria-label="Wishlist"
              >
                <Heart size={19} strokeWidth={1.8} className="text-gray-700" />
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.92 }}
            >
              <Link
                href="/account"
                className="hidden size-10 items-center justify-center rounded-full transition-colors hover:bg-gray-100 md:flex"
                aria-label="Account"
              >
                <User size={19} strokeWidth={1.8} className="text-gray-700" />
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.92 }}
            >
              <Link
                href="/cart"
                className="relative flex size-10 items-center justify-center rounded-full transition-colors hover:bg-gray-100"
                aria-label="Shopping bag"
              >
                <ShoppingBag size={20} strokeWidth={1.8} className="text-gray-700" />
                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.span
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                      className="absolute -right-0.5 -top-0.5 flex size-4.5 items-center justify-center rounded-full bg-lime-400 text-[9px] font-bold text-white shadow-sm"
                    >
                      {cartCount > 9 ? "9+" : cartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {open && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden border-t border-gray-200/50"
            >
              <div className="flex flex-col gap-1 py-4">
                {[...navLinks, { href: "/wishlist", label: "Wishlist" }].map(
                  (link, index) => (
                    <motion.div
                      key={link.href}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className={`
                          block rounded-lg px-4 py-2.5 text-sm font-medium transition-colors
                          ${
                            isActive(link.href)
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                          }
                        `}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  )
                )}

                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.25 }}
                >
                  <Link
                    href="/account"
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-4 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
                  >
                    Account
                  </Link>
                </motion.div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </Container>
    </motion.header>
  );
}