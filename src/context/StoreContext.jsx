"use client";

import { createContext, useContext, useEffect, useState } from "react";
import ordersData from "../../database/orders.json"
const StoreContext = createContext(null);

export function StoreProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [orders, setOrders] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  // =========================
  // LOAD SAVED DATA
  // =========================

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
      } else {
        // First load → use demo orders from orders.json
        setOrders(ordersData);
      }
    } catch (error) {
      console.error("Failed to load store data:", error);

      // Fallback to demo orders
      setOrders(ordersData);
    } finally {
      setHydrated(true);
    }
  }, []);

  // =========================
  // SAVE CART
  // =========================

  useEffect(() => {
    if (!hydrated) return;

    localStorage.setItem("neo-cart", JSON.stringify(cart));
  }, [cart, hydrated]);

  // =========================
  // SAVE WISHLIST
  // =========================

  useEffect(() => {
    if (!hydrated) return;

    localStorage.setItem(
      "neo-wishlist",
      JSON.stringify(wishlist)
    );
  }, [wishlist, hydrated]);

  // =========================
  // SAVE ORDERS
  // =========================

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
    const price = Number(
      item.salePrice ?? item.price ?? 0
    );

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

    const orderDate = new Date().toISOString();

    const order = {
      id: `NX-${Date.now()
        .toString()
        .slice(-8)}`,

      date: orderDate,

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

      total:
        cartTotal >= 100
          ? cartTotal
          : cartTotal + 10,

      timeline: [
        {
          status: "Order Placed",
          date: orderDate,
          completed: true,
        },
        {
          status: "Confirmed",
          date: null,
          completed: false,
        },
        {
          status: "Shipped",
          date: null,
          completed: false,
        },
        {
          status: "Out for Delivery",
          date: null,
          completed: false,
        },
        {
          status: "Delivered",
          date: null,
          completed: false,
        },
      ],
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
  // UPDATE ORDER STATUS
  // =========================

  const updateOrderStatus = (orderId, status) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId
          ? {
              ...order,
              status,
              timeline: buildTimeline(
                status,
                order.timeline
              ),
            }
          : order
      )
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
        updateOrderStatus,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

// =========================
// BUILD ORDER TIMELINE
// =========================

function buildTimeline(
  status,
  existingTimeline = []
) {
  const steps = [
    "Order Placed",
    "Confirmed",
    "Shipped",
    "Out for Delivery",
    "Delivered",
  ];

  const statusIndex = {
    Pending: 2,
    Confirmed: 2,
    Shipped: 3,
    "Out for Delivery": 4,
    Delivered: 5,
  };

  const completedUntil =
    statusIndex[status] ?? 2;

  return steps.map((step, index) => {
    const existing = existingTimeline.find(
      (item) => item.status === step
    );

    return {
      status: step,

      date:
        index < completedUntil
          ? existing?.date ||
            new Date().toISOString()
          : null,

      completed:
        index < completedUntil,
    };
  });
}

// =========================
// USE STORE
// =========================

export function useStore() {
  const context = useContext(StoreContext);

  if (!context) {
    throw new Error(
      "useStore must be used inside StoreProvider"
    );
  }

  return context;
}