import products from "@/../database/products.json";
import categories from "@/../database/categories.json";

export function getAllProducts() {
  return products;
}

export function getFeaturedProducts() {
  return products.filter((product) => product.featured);
}

export function getProductById(id) {
  return products.find((product) => product.id === id);
}

export function getProductBySlug(slug) {
  return products.find((product) => product.slug === slug);
}

export function getAllCategories() {
  return categories;
}

export function getCategoryBySlug(slug) {
  return categories.find((category) => category.slug === slug);
}

export function getProductsByCategory(categoryId) {
  return products.filter((product) => product.categoryId === categoryId);
}

export function getAllBrands() {
  return [...new Set(products.map((product) => product.brand))];
}