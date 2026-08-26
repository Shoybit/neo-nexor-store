"use client";

import { useState } from "react";
import Image from "next/image";
import { CheckCircle2, ArrowLeft, ArrowRight, ShoppingBag } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { useRouter } from "next/navigation";

export default function CheckoutForm() {
  const { cart, cartTotal, clearCart } = useStore();

  const { placeOrder } = useStore();
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [orderId, setOrderId] = useState("");

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  });

  const [errors, setErrors] = useState({});

  const shipping = cartTotal >= 100 ? 0 : 10;
  const total = cartTotal + shipping;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.fullName.trim()) {
      newErrors.fullName = "Full name is required.";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^[0-9+\-\s()]{7,}$/.test(form.phone)) {
      newErrors.phone = "Enter a valid phone number.";
    }

    if (!form.address.trim()) {
      newErrors.address = "Address is required.";
    }

    if (!form.city.trim()) {
      newErrors.city = "City is required.";
    }

    if (!form.postalCode.trim()) {
      newErrors.postalCode = "Postal code is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

const handlePlaceOrder = () => {
  console.log("handlePlaceOrder started");

  const order = placeOrder({
    customer: {
      name: form.fullName,
      email: form.email,
      phone: form.phone,
    },

    address: {
      address: form.address,
      city: form.city,
      postalCode: form.postalCode,
    },

    items: cart,
    subtotal: cartTotal,
    shipping,
    total,
    paymentMethod: "Cash on Delivery",
  });

  console.log("Created order:", order);

  if (!order) {
    console.error("Order was not created");
    return;
  }

  setOrderId(order.id);
  clearCart();
  setStep(3);
};


  const handleContinue = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setStep(2);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (step === 3) {
    
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white p-8 text-center shadow-sm sm:p-12">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-lime-100">
            <CheckCircle2
              size={42}
              className="text-lime-600"
            />
          </div>

          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.25em] text-gray-400">
            Order Confirmed
          </p>

          <h1 className="mt-3 text-3xl font-black tracking-tight text-black sm:text-4xl">
            Thank you for your order!
          </h1>

          <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-gray-500">
            Your order has been successfully placed. We&apos;ll send your
            order details and updates to your email.
          </p>

          <div className="mt-8 rounded-2xl bg-[#f8f8f5] p-5">
            <p className="text-xs uppercase tracking-wider text-gray-400">
              Order ID
            </p>
            <p className="mt-1 text-xl font-bold text-black">
              {orderId}
            </p>
          </div>

          <a
            href="/shop"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-black px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-lime-400 hover:text-black"
          >
            Continue Shopping
            <ArrowRight size={17} />
          </a>
        </div>
      </div>
    );
  }

  if (!cart || cart.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center sm:px-6">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-black/5">
          <ShoppingBag size={32} className="text-gray-400" />
        </div>

        <h1 className="mt-6 text-3xl font-black text-black">
          Your cart is empty
        </h1>

        <p className="mt-3 text-sm text-gray-500">
          Add some products to your cart before checking out.
        </p>

        <a
          href="/shop"
          className="mt-7 inline-flex rounded-full bg-black px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-lime-400 hover:text-black"
        >
          Browse Products
        </a>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      {/* Header */}
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-400">
          Checkout
        </p>

        <h1 className="mt-2 text-3xl font-black tracking-tight text-black sm:text-4xl">
          Complete your order
        </h1>

        {/* Steps */}
        <div className="mt-8 flex items-center gap-3">
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
              step >= 1
                ? "bg-black text-white"
                : "bg-black/10 text-gray-400"
            }`}
          >
            1
          </div>
          <span className={`text-sm font-medium ${step >= 1 ? "text-black" : "text-gray-400"}`}>
            Information
          </span>
          <div className="h-px w-10 bg-black/10 sm:w-20" />
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
              step >= 2
                ? "bg-black text-white"
                : "bg-black/10 text-gray-400"
            }`}
          >
            2
          </div>
          <span className={`text-sm font-medium ${step === 2 ? "text-black" : "text-gray-400"}`}>
            Review
          </span>
        </div>
      </div>

      {step === 1 ? (
        <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
          {/* Form */}
          <form
            onSubmit={handleContinue}
            className="rounded-3xl bg-white p-6 shadow-sm sm:p-8"
          >
            <h2 className="text-xl font-bold text-black">
              Shipping Information
            </h2>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <Field
                label="Full Name"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                error={errors.fullName}
                placeholder="John Doe"
              />

              <Field
                label="Email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                error={errors.email}
                placeholder="john@example.com"
              />

              <Field
                label="Phone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                error={errors.phone}
                placeholder="+1 234 567 890"
              />

              <Field
                label="City"
                name="city"
                value={form.city}
                onChange={handleChange}
                error={errors.city}
                placeholder="New York"
              />

              <div className="sm:col-span-2">
                <Field
                  label="Address"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  error={errors.address}
                  placeholder="123 Main Street"
                />
              </div>

              <Field
                label="Postal Code"
                name="postalCode"
                value={form.postalCode}
                onChange={handleChange}
                error={errors.postalCode}
                placeholder="10001"
              />
            </div>

            <button
              type="submit"
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-black py-3.5 text-sm font-semibold text-white transition hover:bg-lime-400 hover:text-black"
            >
              Continue to Review
              <ArrowRight size={17} />
            </button>
          </form>

          <OrderSummary cart={cart} subtotal={cartTotal} shipping={shipping} total={total} />
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
          {/* Review */}
          <div className="rounded-3xl bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-black">
                Review Information
              </h2>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-sm font-medium text-gray-400 hover:text-black"
              >
                Edit
              </button>
            </div>

            <div className="mt-6 rounded-2xl bg-[#f8f8f5] p-5">
              <p className="text-xs uppercase tracking-wider text-gray-400">
                Shipping Address
              </p>
              <div className="mt-3 space-y-1 text-sm">
                <p className="font-semibold text-black">
                  {form.fullName}
                </p>
                <p className="text-gray-600">{form.address}</p>
                <p className="text-gray-600">
                  {form.city}, {form.postalCode}
                </p>
                <p className="text-gray-600">{form.phone}</p>
                <p className="text-gray-600">{form.email}</p>
              </div>
            </div>

            <div className="mt-8 flex gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex flex-1 items-center justify-center gap-2 rounded-full border border-gray-200 py-3.5 text-sm font-semibold text-gray-600 transition hover:bg-black/5"
              >
                <ArrowLeft size={17} />
                Back
              </button>
<button
  type="button"
  onClick={handlePlaceOrder}
  className="flex flex-[2] items-center justify-center gap-2 rounded-full bg-black py-3.5 text-sm font-semibold text-white transition hover:bg-lime-400 hover:text-black"
>
  Place Order
  <CheckCircle2 size={17} />
</button>
            </div>
          </div>

          <OrderSummary cart={cart} subtotal={cartTotal} shipping={shipping} total={total} />
        </div>
      )}
    </div>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  error,
  placeholder,
  type = "text",
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-semibold text-black"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-black outline-none transition placeholder:text-gray-400 ${
          error
            ? "border-red-400 focus:ring-2 focus:ring-red-100"
            : "border-gray-200 focus:border-black"
        }`}
      />
      {error && (
        <p className="mt-1.5 text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}

function OrderSummary({
  cart,
  subtotal,
  shipping,
  total,
}) {
  return (
    <aside className="h-fit rounded-3xl bg-white p-6 shadow-sm sm:p-7 lg:sticky lg:top-6">
      <h2 className="text-xl font-bold text-black">
        Order Summary
      </h2>

      <div className="mt-6 space-y-4">
        {cart.map((item) => {
          const itemPrice = item.salePrice ?? item.price;

          return (
            <div
              key={item.id}
              className="flex gap-3"
            >
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-[#f3f3ee]">
                <Image
                  src={item.thumbnail || item.image}
                  alt={item.name}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-black">
                  {item.name}
                </p>
                <p className="mt-1 text-xs text-gray-400">
                  Qty: {item.quantity}
                </p>
                <p className="mt-1 text-sm font-bold text-black">
                  ${(itemPrice * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="my-6 h-px bg-black/5" />

      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-500">Subtotal</span>
          <span className="font-medium text-black">
            ${subtotal.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Shipping</span>
          <span className="font-medium text-black">
            {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
          </span>
        </div>
      </div>

      <div className="my-6 h-px bg-black/5" />

      <div className="flex items-center justify-between">
        <span className="text-base font-bold text-black">Total</span>
        <span className="text-xl font-black text-black">
          ${total.toFixed(2)}
        </span>
      </div>

      {shipping === 0 && (
        <p className="mt-3 rounded-xl bg-lime-50 p-3 text-xs font-medium text-lime-700">
          🎉 You&apos;ve unlocked free shipping!
        </p>
      )}
    </aside>
  );
}