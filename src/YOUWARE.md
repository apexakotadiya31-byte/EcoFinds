# EcoFinds - Sustainable Marketplace

EcoFinds is a React-based web application for buying and selling second-hand products, promoting a circular economy.

## Project Overview

- **Framework**: React 18 + Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context API + LocalStorage
- **Routing**: React Router DOM

## Features

- **User Authentication**: Frontend-only auth with LocalStorage persistence.
- **Product Management**: Create, Read, Update (simulated), Delete products.
- **Shopping Cart**: Add to cart, update quantities, checkout.
- **Search & Filter**: Keyword search and category filtering.
- **Responsive Design**: Mobile-first UI using Tailwind CSS.

## Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── ui/             # Primitive components (Button, Input)
│   ├── Layout.tsx      # Main layout wrapper
│   ├── Navbar.tsx      # Navigation bar
│   └── ProductCard.tsx # Product display component
├── context/            # Global state (Auth, Product, Cart)
├── data/               # Dummy data for initialization
├── pages/              # Application pages
│   ├── AddProduct.tsx  # Create/Edit product
│   ├── Cart.tsx        # Shopping cart
│   ├── Dashboard.tsx   # User profile
│   ├── Feed.tsx        # Product listing
│   ├── Home.tsx        # Landing page
│   ├── Login.tsx       # Sign in
│   ├── MyListings.tsx  # User's products
│   ├── ProductDetail.tsx # Product details
│   ├── Purchases.tsx   # Order history
│   └── Register.tsx    # Sign up
├── types/              # TypeScript interfaces
└── utils/              # Helper functions
```

## Development

### Commands

- `npm install`: Install dependencies
- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build

### Key Architecture Decisions

- **Context API**: Used for global state (Auth, Cart, Products) to avoid external dependencies like Redux, keeping the app lightweight.
- **LocalStorage**: Used to persist data (User session, Cart, Products, Purchases) so data survives refreshes without a backend.
- **Tailwind CSS**: Used for rapid, responsive styling.
- **Dummy Data**: Initialized on first load if LocalStorage is empty.

## Database / Data Model

Since there is no backend, data is stored in `localStorage` keys:
- `ecofinds_user`: Current logged-in user.
- `ecofinds_products`: List of all products.
- `ecofinds_cart`: Current cart items.
- `ecofinds_purchases`: Purchase history.

## Future Improvements

- Integrate a real backend (Node.js/Express or Firebase).
- Implement real image uploads (currently using placeholders).
- Add payment processing (Stripe).
