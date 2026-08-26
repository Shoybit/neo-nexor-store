import products from "../../database/products.json";
import categories from "../../database/categories.json";
import customers from "../../database/customers.json";
import orders from "../../database/orders.json";

export function getAllProducts() {
  return products;
}

export function getFeaturedProducts() {
  return products
    .filter((product) => product.featured === true)
    .slice(0, 4);
}

export function getProductById(id) {
  return products.find(
    (product) => String(product.id) === String(id)
  );
}

export function getProductsByCategory(category) {
  return products.filter(
    (product) =>
      product.category?.toLowerCase() === category?.toLowerCase()
  );
}

export function getAllCategories() {
  return categories;
}

export function getCategoryBySlug(slug) {
  return categories.find(
    (category) => category.slug === slug
  );
}

export function getAllCustomers() {
  return customers;
}

export function getAllOrders() {
  return orders;
}

export function getOrderById(id) {
  return orders.find(
    (order) => String(order.id) === String(id)
  );
}