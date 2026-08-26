"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, X, ChevronDown, SlidersHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import Container from "@/components/Container";
import ProductCard from "@/components/ProductCard";
import { getAllProducts, getAllCategories, getAllBrands } from "@/lib/data";

export default function ShopPage() {
  const products = getAllProducts();
  const categories = getAllCategories();
  const brands = getAllBrands();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [brand, setBrand] = useState("all");
  const [sort, setSort] = useState("featured");
  const [maxPrice, setMaxPrice] = useState(300);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (search.trim()) {
      const query = search.toLowerCase();
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.brand.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)
      );
    }

    if (category !== "all") {
      result = result.filter(
        (product) => product.categoryId === category
      );
    }

    if (brand !== "all") {
      result = result.filter(
        (product) => product.brand === brand
      );
    }

    result = result.filter(
      (product) => (product.salePrice ?? product.price) <= maxPrice
    );

    switch (sort) {
      case "price-low":
        result.sort(
          (a, b) =>
            (a.salePrice ?? a.price) -
            (b.salePrice ?? b.price)
        );
        break;
      case "price-high":
        result.sort(
          (a, b) =>
            (b.salePrice ?? b.price) -
            (a.salePrice ?? a.price)
        );
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        result.sort(
          (a, b) => Number(b.isNew) - Number(a.isNew)
        );
        break;
      default:
        result.sort(
          (a, b) => Number(b.featured) - Number(a.featured)
        );
    }

    return result;
  }, [search, category, brand, sort, maxPrice, products]);

  const clearFilters = () => {
    setSearch("");
    setCategory("all");
    setBrand("all");
    setSort("featured");
    setMaxPrice(300);
  };

  const hasFilters =
    search ||
    category !== "all" ||
    brand !== "all" ||
    maxPrice !== 300;

  // Filter Sidebar Content
  const FilterContent = () => (
    <div className="space-y-6">
      {/* Search */}
      <div>
        <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-400">
          Search
        </label>
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="h-10 w-full rounded-lg bg-[#f8f8f5] pl-9 pr-3 text-sm text-black outline-none transition placeholder:text-gray-400 focus:ring-2 focus:ring-lime-400"
          />
        </div>
      </div>

      {/* Category */}
      <div>
        <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-400">
          Category
        </label>
        <div className="relative">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="h-10 w-full appearance-none rounded-lg bg-[#f8f8f5] px-3 pr-8 text-sm text-black outline-none focus:ring-2 focus:ring-lime-400"
          >
            <option value="all">All categories</option>
            {categories.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
          <ChevronDown
            size={14}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
        </div>
      </div>

      {/* Brand */}
      <div>
        <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-400">
          Brand
        </label>
        <div className="relative">
          <select
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="h-10 w-full appearance-none rounded-lg bg-[#f8f8f5] px-3 pr-8 text-sm text-black outline-none focus:ring-2 focus:ring-lime-400"
          >
            <option value="all">All brands</option>
            {brands.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <ChevronDown
            size={14}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
        </div>
      </div>

      {/* Price Range */}
      <div>
        <div className="mb-2 flex items-center justify-between">
          <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">
            Max Price
          </label>
          <span className="text-sm font-bold text-black">${maxPrice}</span>
        </div>
        <input
          type="range"
          min="30"
          max="300"
          step="10"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-lime-400"
        />
        <div className="mt-1 flex justify-between text-xs text-gray-400">
          <span>$30</span>
          <span>$300</span>
        </div>
      </div>

      {/* Sort */}
      <div>
        <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-400">
          Sort By
        </label>
        <div className="relative">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="h-10 w-full appearance-none rounded-lg bg-[#f8f8f5] px-3 pr-8 text-sm text-black outline-none focus:ring-2 focus:ring-lime-400"
          >
            <option value="featured">Featured</option>
            <option value="newest">Newest</option>
            <option value="rating">Top rated</option>
            <option value="price-low">Price: Low to high</option>
            <option value="price-high">Price: High to low</option>
          </select>
          <ChevronDown
            size={14}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
        </div>
      </div>

      {/* Active Filters */}
      {hasFilters && (
        <div className="border-t border-black/5 pt-4">
          <button
            onClick={clearFilters}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-black/5 py-2 text-sm font-semibold text-black transition hover:bg-black/10"
          >
            <X size={14} />
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );

  return (
    <main className="min-h-screen bg-[#f8f8f5]">
      {/* Header */}
      <section className="border-b border-black/5 bg-white">
        <Container>
          <div className="py-8 sm:py-12">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-gray-400">
              Neo Nexor Collection
            </p>
            <h1 className="text-3xl font-black tracking-[-0.06em] text-black sm:text-4xl">
              Shop everything.
            </h1>
            <p className="mt-2 max-w-xl text-sm text-gray-600">
              Explore footwear, clothing and accessories designed for modern everyday living.
            </p>
          </div>
        </Container>
      </section>

      <Container>
        <div className="py-6">
          {/* Mobile Filter Toggle */}
          <div className="mb-4 flex items-center justify-between lg:hidden">
            <p className="text-sm font-semibold text-black">
              {filteredProducts.length} products
            </p>
            <button
              onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
              className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-black shadow-sm transition hover:shadow-md"
            >
              <SlidersHorizontal size={16} />
              Filters
              {hasFilters && (
                <span className="rounded-full bg-lime-400 px-2 py-0.5 text-[10px] text-black">
                  Active
                </span>
              )}
            </button>
          </div>

          <div className="flex gap-8">
            {/* Desktop Filter Sidebar */}
            <aside className="hidden w-64 shrink-0 lg:block">
              <div className="sticky top-24 rounded-2xl border border-black/5 bg-white p-5">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-sm font-bold text-black">Filters</h2>
                  {hasFilters && (
                    <button
                      onClick={clearFilters}
                      className="text-xs text-gray-400 hover:text-black"
                    >
                      Clear all
                    </button>
                  )}
                </div>
                <FilterContent />
              </div>
            </aside>

            {/* Products Grid */}
            <div className="flex-1">
              {/* Desktop Results Header */}
              <div className="mb-4 hidden items-center justify-between lg:flex">
                <div>
                  <p className="text-sm font-semibold text-black">
                    {filteredProducts.length} products
                  </p>
                  {hasFilters && (
                    <p className="text-xs text-gray-400">
                      Filters applied
                    </p>
                  )}
                </div>
              </div>

              {/* Product Grid */}
              {filteredProducts.length > 0 ? (
                <div className="grid gap-4 pb-20 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.4,
                        delay: index * 0.05,
                      }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </div>
              ) : (
                /* Empty state */
                <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-dashed border-black/10 bg-white px-6 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-black/5">
                    <Search size={22} className="text-gray-400" />
                  </div>
                  <h2 className="mt-4 text-lg font-bold text-black">
                    No products found
                  </h2>
                  <p className="mt-1 max-w-sm text-sm text-gray-400">
                    Try adjusting your filters or search terms.
                  </p>
                  <button
                    onClick={clearFilters}
                    className="mt-4 rounded-full bg-black px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-lime-400 hover:text-black"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>

      {/* Mobile Filter Overlay */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFilterOpen(false)}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
            />
            
            {/* Filter Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed right-0 top-0 z-50 h-full w-[320px] bg-white p-6 shadow-xl lg:hidden"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-black">Filters</h2>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="rounded-full p-2 hover:bg-black/5"
                >
                  <X size={20} className="text-gray-600" />
                </button>
              </div>
              <div className="mt-6">
                <FilterContent />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}