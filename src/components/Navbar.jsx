/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Heart,
  User,
  ShoppingBag,
  X,
  Minus,
  Plus,
  Trash2,
  Menu,
} from "lucide-react";
import { useState } from "react";
import { useStore } from "@/context/StoreContext";

export default function Navbar() {
  const [activePanel, setActivePanel] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const {
    cart,
    wishlist,
    removeFromCart,
    updateQuantity,
    toggleWishlist,
    addToCart,
  } = useStore();

  const pathname = usePathname();

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const cartTotal = cart.reduce((total, item) => {
    const price = item.salePrice || item.price;
    return total + price * item.quantity;
  }, 0);

  const openPanel = (panel) => {
    setMobileMenuOpen(false);
    setActivePanel(panel);
  };

  const closePanel = () => {
    setActivePanel(null);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const isActive = (href) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname.startsWith(href);
  };

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <header className="sticky top-0 z-40 border-b border-black/5 bg-white">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">

          {/* Logo */}
          <Link
            href="/"
            onClick={closeMobileMenu}
            className="text-xl font-black tracking-[-0.06em] text-black sm:text-2xl"
          >
            NEO<span className="text-lime-400">·</span>NEXOR
          </Link>

          {/* ================= DESKTOP NAV ================= */}
          <nav className="hidden items-center gap-8 md:flex">
            <NavLink
              href="/"
              label="Home"
              active={isActive("/")}
            />

            <NavLink
              href="/shop"
              label="Shop"
              active={isActive("/shop")}
            />

            <NavLink
              href="/orders"
              label="My Orders"
              active={isActive("/orders")}
            />
          </nav>

          {/* ================= ACTIONS ================= */}
          <div className="flex items-center gap-4 sm:gap-5">

            {/* Wishlist */}
            <button
              type="button"
              onClick={() => openPanel("wishlist")}
              className="relative text-gray-600 transition hover:text-black"
              aria-label="Wishlist"
            >
              <Heart size={20} />

              {wishlist.length > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-lime-400 px-1 text-[9px] font-bold text-black">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Account */}
            <Link
              href="/orders"
              className="hidden text-gray-600 transition hover:text-black sm:block"
              aria-label="Account"
            >
              <User size={20} />
            </Link>

            {/* Cart */}
            <button
              type="button"
              onClick={() => openPanel("cart")}
              className="relative text-gray-600 transition hover:text-black"
              aria-label="Shopping cart"
            >
              <ShoppingBag size={20} />

              {cartCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-lime-400 px-1 text-[9px] font-bold text-black">
                  {cartCount}
                </span>
              )}
            </button>

            {/* ================= MOBILE HAMBURGER ================= */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="flex items-center justify-center text-gray-700 transition hover:text-black md:hidden"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X size={22} />
              ) : (
                <Menu size={22} />
              )}
            </button>
          </div>
        </div>

        {/* ================= MOBILE MENU ================= */}
        {mobileMenuOpen && (
          <div className="border-t border-black/5 bg-white md:hidden">
            <nav className="px-5 py-4">
              <div className="flex flex-col">
                <MobileNavLink
                  href="/"
                  label="Home"
                  active={isActive("/")}
                  onClick={closeMobileMenu}
                />

                <MobileNavLink
                  href="/shop"
                  label="Shop"
                  active={isActive("/shop")}
                  onClick={closeMobileMenu}
                />

                <MobileNavLink
                  href="/orders"
                  label="My Orders"
                  active={isActive("/orders")}
                  onClick={closeMobileMenu}
                />
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* ================= OVERLAY ================= */}
      {activePanel && (
        <div
          onClick={closePanel}
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-[2px]"
        />
      )}

      {/* ================= SIDE DRAWER ================= */}
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ${
          activePanel
            ? "translate-x-0"
            : "translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-black/10 px-6 py-5">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gray-400">
              {activePanel === "cart"
                ? "Your Items"
                : "Saved Items"}
            </p>

            <h2 className="mt-1 text-xl font-black text-black">
              {activePanel === "cart"
                ? "Shopping Cart"
                : "Wishlist"}
            </h2>
          </div>

          <button
            type="button"
            onClick={closePanel}
            className="rounded-full p-2 transition hover:bg-black/5"
            aria-label="Close"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        {/* ================= WISHLIST ================= */}
        {activePanel === "wishlist" && (
          <div className="flex-1 overflow-y-auto p-6">
            {wishlist.length === 0 ? (
              <EmptyState
                icon={<Heart size={24} />}
                title="Your wishlist is empty"
                description="Save products you love and find them here later."
                onClose={closePanel}
              />
            ) : (
              <div className="space-y-5">
                {wishlist.map((product) => (
                  <div
                    key={product.id}
                    className="flex gap-4 border-b border-black/5 pb-5"
                  >
                    <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-[#f3f3ee]">
                      <img
                        src={
                          product.thumbnail ||
                          product.image
                        }
                        alt={product.name}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-medium uppercase tracking-wider text-gray-400">
                        {product.category}
                      </p>

                      <h3 className="mt-1 line-clamp-2 text-sm font-bold text-black">
                        {product.name}
                      </h3>

                      <p className="mt-2 font-bold text-black">
                        ${product.salePrice || product.price}
                      </p>

                      <div className="mt-3 flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => {
                            addToCart(product);
                            toggleWishlist(product);
                          }}
                          className="rounded-full bg-black px-4 py-2 text-xs font-semibold text-white transition hover:bg-lime-400 hover:text-black"
                        >
                          Add to Cart
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            toggleWishlist(product)
                          }
                          className="text-xs font-medium text-gray-400 transition hover:text-red-500"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ================= CART ================= */}
        {activePanel === "cart" && (
          <>
            <div className="flex-1 overflow-y-auto p-6">
              {cart.length === 0 ? (
                <EmptyState
                  icon={<ShoppingBag size={24} />}
                  title="Your cart is empty"
                  description="Add some products and they will appear here."
                  onClose={closePanel}
                />
              ) : (
                <div className="space-y-5">
                  {cart.map((product) => {
                    const productPrice =
                      product.salePrice || product.price;

                    return (
                      <div
                        key={product.id}
                        className="flex gap-4 border-b border-black/5 pb-5"
                      >
                        <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-[#f3f3ee]">
                          <img
                            src={
                              product.thumbnail ||
                              product.image
                            }
                            alt={product.name}
                            className="h-full w-full object-cover"
                          />
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="text-[10px] font-medium uppercase tracking-wider text-gray-400">
                            {product.category}
                          </p>

                          <h3 className="mt-1 line-clamp-2 text-sm font-bold text-black">
                            {product.name}
                          </h3>

                          <p className="mt-2 text-sm font-bold text-black">
                            ${productPrice}
                          </p>

                          <div className="mt-3 flex items-center justify-between">
                            <div className="flex items-center rounded-full border border-gray-200">
                              <button
                                type="button"
                                onClick={() =>
                                  updateQuantity(
                                    product.id,
                                    product.quantity - 1
                                  )
                                }
                                className="p-2 text-gray-400 transition hover:text-black"
                              >
                                <Minus size={13} />
                              </button>

                              <span className="min-w-7 text-center text-xs font-semibold text-black">
                                {product.quantity}
                              </span>

                              <button
                                type="button"
                                onClick={() =>
                                  updateQuantity(
                                    product.id,
                                    product.quantity + 1
                                  )
                                }
                                className="p-2 text-gray-400 transition hover:text-black"
                              >
                                <Plus size={13} />
                              </button>
                            </div>

                            <button
                              type="button"
                              onClick={() =>
                                removeFromCart(product.id)
                              }
                              className="text-gray-300 transition hover:text-red-500"
                              aria-label="Remove product"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Cart Footer */}
            {cart.length > 0 && (
              <div className="border-t border-black/10 p-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    Subtotal
                  </span>

                  <span className="text-xl font-black text-black">
                    ${cartTotal.toFixed(2)}
                  </span>
                </div>

                <Link
                  href="/checkout"
                  onClick={closePanel}
                  className="mt-5 flex w-full items-center justify-center rounded-full bg-black py-3.5 text-sm font-semibold text-white transition hover:bg-lime-400 hover:text-black"
                >
                  Checkout
                </Link>
              </div>
            )}
          </>
        )}
      </aside>
    </>
  );
}

/* ================= DESKTOP NAV LINK ================= */

function NavLink({ href, label, active }) {
  return (
    <Link
      href={href}
      className={`relative py-2 text-sm font-medium transition ${
        active
          ? "text-black"
          : "text-gray-600 hover:text-black"
      }`}
    >
      {label}

      {active && (
        <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-lime-400" />
      )}
    </Link>
  );
}

/* ================= MOBILE NAV LINK ================= */

function MobileNavLink({
  href,
  label,
  active,
  onClick,
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`flex items-center justify-between border-b border-black/5 py-4 text-sm font-semibold transition ${
        active
          ? "text-black"
          : "text-gray-600 hover:text-black"
      }`}
    >
      <span>{label}</span>

      {active && (
        <span className="h-2 w-2 rounded-full bg-lime-400" />
      )}
    </Link>
  );
}

/* ================= EMPTY STATE ================= */

function EmptyState({
  icon,
  title,
  description,
  onClose,
}) {
  return (
    <div className="flex h-full flex-col items-center justify-center text-center">
      <div className="rounded-full bg-black/5 p-4 text-gray-400">
        {icon}
      </div>

      <h3 className="mt-5 text-lg font-bold text-black">
        {title}
      </h3>

      <p className="mt-2 max-w-xs text-sm leading-6 text-gray-400">
        {description}
      </p>

      <Link
        href="/shop"
        onClick={onClose}
        className="mt-6 rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-lime-400 hover:text-black"
      >
        Continue Shopping
      </Link>
    </div>
  );
}