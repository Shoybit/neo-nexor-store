"use client";

import { createContext, useContext, useEffect, useState } from "react";

const StoreContext = createContext(null);

export function StoreProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [orders, setOrders] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  // Load saved data
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("neo-cart");
      const savedWishlist = localStorage.getItem("neo-wishlist");
      const savedOrders = localStorage.getItem("neo-orders");

      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }

      if (savedWishlist) {
        setWishlist(JSON.parse(savedWishlist));
      }

      if (savedOrders) {
        setOrders(JSON.parse(savedOrders));
      }
    } catch (error) {
      console.error("Failed to load store data:", error);
    } finally {
      setHydrated(true);
    }
  }, []);

  // Save cart
  useEffect(() => {
    if (!hydrated) return;

    localStorage.setItem("neo-cart", JSON.stringify(cart));
  }, [cart, hydrated]);

  // Save wishlist
  useEffect(() => {
    if (!hydrated) return;

    localStorage.setItem(
      "neo-wishlist",
      JSON.stringify(wishlist)
    );
  }, [wishlist, hydrated]);

  // Save orders
  useEffect(() => {
    if (!hydrated) return;

    localStorage.setItem(
      "neo-orders",
      JSON.stringify(orders)
    );
  }, [orders, hydrated]);

  // =========================
  // CART
  // =========================

  const addToCart = (product, quantity = 1) => {
    setCart((prev) => {
      const existingProduct = prev.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        return prev.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + quantity,
              }
            : item
        );
      }

      return [
        ...prev,
        {
          ...product,
          quantity,
        },
      ];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prev) =>
      prev.filter((item) => item.id !== productId)
    );
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return;

    setCart((prev) =>
      prev.map((item) =>
        item.id === productId
          ? {
              ...item,
              quantity,
            }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const cartTotal = cart.reduce((total, item) => {
    const price = Number(item.salePrice ?? item.price ?? 0);

    return total + price * item.quantity;
  }, 0);

  // =========================
  // WISHLIST
  // =========================

  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.some(
        (item) => item.id === product.id
      );

      if (exists) {
        return prev.filter(
          (item) => item.id !== product.id
        );
      }

      return [...prev, product];
    });
  };

  const isInWishlist = (productId) => {
    return wishlist.some(
      (item) => item.id === productId
    );
  };

  // =========================
  // ORDERS
  // =========================

  const placeOrder = ({
    customer = {},
    address = {},
    paymentMethod = "Cash on Delivery",
  }) => {
    if (cart.length === 0) {
      return null;
    }

    const order = {
      id: `NX-${Date.now()
        .toString()
        .slice(-8)}`,

      date: new Date().toISOString(),

      status: "Pending",

      customer,

      address,

      paymentMethod,

      items: cart.map((item) => ({
        ...item,
        quantity: item.quantity,
      })),

      subtotal: cartTotal,

      shipping: cartTotal >= 100 ? 0 : 10,

      total: cartTotal >= 100
        ? cartTotal
        : cartTotal + 10,
    };

    setOrders((prev) => [order, ...prev]);

    // Order placed → empty cart
    setCart([]);

    return order;
  };

  const getOrderById = (orderId) => {
    return orders.find(
      (order) => order.id === orderId
    );
  };

  // =========================
  // PROVIDER
  // =========================

  return (
    <StoreContext.Provider
      value={{
        // Cart
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,

        // Wishlist
        wishlist,
        toggleWishlist,
        isInWishlist,

        // Orders
        orders,
        placeOrder,
        getOrderById,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);

  if (!context) {
    throw new Error(
      "useStore must be used inside StoreProvider"
    );
  }

  return context;
}