# NEO NEXOR — E-Commerce Storefront

A modern, responsive e-commerce storefront built as a frontend practical assessment for Neo Nexor Product & Engineering.

## Live Demo

**Live URL:** https://neo-nexor-store-ag4c.vercel.app/

## GitHub Repository

**Repository:** https://github.com/Shoybit/neo-nexor-store

---

## Tech Stack

- **Next.js 16.2.10** — App Router
- **React 19**
- **Tailwind CSS**
- **Lucide React** — Icons
- **Framer Motion** — Purposeful UI motion
- **React Hot Toast** — User feedback
- **Context API** — Global application state
- **Local JSON** — Mock product/order/customer data
- **localStorage** — Persistent cart, wishlist and orders

---

## Features

The storefront implements all eight requested customer-facing flows:

### 1. Storefront / Home
- Hero section
- Featured products
- Product categories
- Promotional content
- Responsive product browsing experience

### 2. Product Details
- Product image gallery
- Product pricing
- Sale pricing where applicable
- Product information
- Wishlist support
- Add to cart
- Responsive layout

### 3. Search & Filter
- Product search by name
- Category filtering
- Brand filtering
- Price filtering
- Sorting
- Empty-results state

### 4. Cart
- Add products
- Update quantities
- Remove products
- Live subtotal/total calculation
- Empty-cart state
- Persistent cart using localStorage

### 5. Checkout
- Customer/address information
- Form validation
- Order summary
- Shipping calculation
- Order confirmation
- Cart is cleared after successful order placement

### 6. My Orders
- Order list
- Filter by:
  - All
  - Pending
  - Delivered
  - Cancelled
  - Returned
- Order details
- Order totals
- Order item information

### 7. Order Tracking
- Order status
- Visual delivery timeline
- Order Placed
- Confirmed
- Shipped
- Out for Delivery
- Delivered

### 8. Wishlist
- Save products
- Remove products
- Move products to cart
- Persistent wishlist using localStorage

---

## UI & Interaction

The interface was designed with a mobile-first approach because the brief highlights mobile traffic as a priority.

Design principles used:

- Clean modern e-commerce layout
- Strong typography hierarchy
- Restrained gradients and shadows
- Rounded UI elements
- Lime accent used as a visual highlight
- Purposeful hover and entrance animations
- Responsive layouts for mobile, tablet and desktop
- Intentional empty states
- Toast feedback for important user actions
- Inline form validation
- No browser alert dialogs for normal interactions

---

## State Management

The project uses **React Context API** through a centralized `StoreContext`.

The context manages:

- Cart state
- Wishlist state
- Orders state
- Cart quantity
- Cart total
- Add/remove/update cart operations
- Wishlist operations
- Order creation
- Order lookup
- Order status/timeline updates

### Persistence

Cart, wishlist and orders are persisted in `localStorage`.

Storage keys:

- `neo-cart`
- `neo-wishlist`
- `neo-orders`

This means refreshing the browser does not remove the user's cart or wishlist.

I chose Context API because the assessment is a frontend-only application with a relatively focused global state surface. It keeps the implementation lightweight without introducing Redux/Zustand overhead.

---

## Mock Data

All application data is stored locally inside the `/database` directory.

The data is modeled around the structure described in the assessment reference material, including concepts such as:

- Products
- Categories
- Customers
- Orders
- Order statuses
- Order timeline
- Shipping address
- Product variants

No live API or external database is required.

---

## Project Structure

```text
.
├── app/
│   ├── cart/
│   ├── checkout/
│   ├── orders/
│   ├── product/
│   ├── shop/
│   ├── wishlist/
│   ├── layout.jsx
│   └── page.jsx
│
├── components/
│   ├── AnnouncementBar.jsx
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── ProductCard.jsx
│   └── ...
│
├── context/
│   └── StoreContext.jsx
│
├── database/
│   ├── products.json
│   ├── orders.json
│   ├── customers.json
│   └── categories.json
│
├── public/
├── app/
├── package.json
└── README.md
```

---

## Getting Started

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd YOUR_PROJECT_FOLDER
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

### 4. Open the application

Visit:

```text
http://localhost:3000
```

---

## Production Build

To create a production build:

```bash
npm run build
```

Then start the production server:

```bash
npm start
```

---

## Deployment

The application can be deployed directly to **Vercel** or **Netlify**.

No backend server, database, environment variables, or API configuration is required.

---

## Assumptions

- The application is a frontend-only storefront.
- Product, customer and order information is mock data.
- Authentication is outside the scope of the assessment.
- Orders created through checkout are stored locally in the browser.
- The default newly-created order status is `Pending`.
- Shipping is free for orders of $100 or more; otherwise shipping is $10.
- Payment is represented as a frontend selection and does not process a real transaction.
- Order tracking is simulated through local state and mock timeline data.

---

## States Covered

The UI includes intentional handling for:

- Loading
- Empty cart
- Empty wishlist
- Empty order list
- Empty search results
- Form validation errors
- Successful cart actions
- Successful wishlist actions
- Successful checkout/order creation
- Order tracking states

---

## Assessment Notes

The main goal of the implementation was to balance:

1. Visual polish
2. Functional customer flows
3. Responsive behavior
4. Maintainable component structure
5. Consistent state management
6. Clear user feedback

The UI was intentionally designed rather than following a pixel-perfect template, as the assessment does not provide a Figma design and explicitly encourages individual design judgment.

---

## Author

**Shoyaib**

Frontend / MERN Stack Developer
