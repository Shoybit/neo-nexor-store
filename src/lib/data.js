import products from "../../database/products.json";
import categories from "../../database/categories.json";

export function getAllProducts() {
  return products;
}

export function getFeaturedProducts() {
  return products.filter((product) => product.featured);
}

export function getAllCategories() {
  return categories.map((category) => ({
    ...category,
    href: `/shop?category=${category.slug}`,
    icon: "→",
    count: products.filter(
      (product) => product.categoryId === category.id
    ).length,
  }));
}

export function getAllBrands() {
  return [...new Set(products.map((product) => product.brand))];
}

export function getProductBySlug(slug) {
  return products.find((product) => product.slug === slug);
}