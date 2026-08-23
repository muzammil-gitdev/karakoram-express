<p align="center">
  <h1 align="center">🚌 Karakoram Express — Frontend</h1>
  <p align="center">
    A modern bus booking interface for transit services across Northern Pakistan's Karakoram Highway.
    <br />
    Built with React 19 · Vite 8 · Tailwind CSS v4
  </p>
</p>

---

## 📋 Overview

Karakoram Express is a full-featured bus reservation platform serving routes across **Rawalpindi ↔ Skardu ↔ Gilgit ↔ Hunza**. This frontend delivers a multi-step booking wizard, interactive seat selection, Stripe-powered checkout, and a complete admin portal — all wrapped in a Material Design 3 inspired UI.

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| **React** | 19 | UI framework |
| **Vite** | 8 | Build tool & dev server |
| **Tailwind CSS** | 4 | Utility-first styling |
| **React Router** | 7 | Client-side routing (nested layouts) |
| **Hanken Grotesk** | — | Display & body typography |
| **Material Symbols** | — | Iconography |

## ⭐ Features

### Public Pages
- **Homepage** — Hero section, booking widget, featured routes (fetched from API), and "Why Choose Us" section
- **Booking** — 4-step wizard: Route Selection → Bus Listing → Seat Map → Passenger Details → Stripe Checkout
- **About Us** — Company story and mission
- **Services** — Service offerings overview
- **Offices** — Office locations and contact info

### Booking Flow
- 🔄 Origin/Destination swap with one click
- 📅 Date picker with minimum date validation
- 🚍 Real-time bus availability from backend API
- 🪑 Interactive 32-seat visual grid (available / selected / booked states)
- 💳 Stripe Checkout redirect with booking summary sidebar
- ✅ Booking confirmation with full details

### Admin Portal (`/portal`)
- 🔐 Login with SHA-256 credential verification
- 📊 Dashboard overview
- 🛣️ Transit Routes — Full CRUD (create, edit, delete)
- 🌟 Featured Routes — Manage with image upload
- 👥 Passenger Lookup — Search by route, date, vehicle

## 📁 Project Structure

```
karakoram-express/
├── components/
│   ├── FeaturedRoutesCard.jsx     # Route card component
│   ├── Footer.jsx                 # Site footer
│   ├── Navbar.jsx                 # Sticky glassmorphic navbar
│   └── portal/
│       ├── EditTransitRoute.jsx   # Transit route edit modal
│       ├── PortalFormField.jsx    # Reusable form field
│       ├── PortalLayout.jsx       # Admin sidebar layout
│       └── PortalToast.jsx        # Toast notification
├── pages/
│   ├── Homepage.jsx               # Landing page
│   ├── Booking.jsx                # Multi-step booking wizard
│   ├── AboutUs.jsx                # About page
│   ├── Services.jsx               # Services page
│   ├── Offices.jsx                # Office locations
│   ├── AppLayout.jsx              # Public layout wrapper
│   └── portal/
│       ├── PortalLogin.jsx        # Admin login
│       ├── PortalDashboard.jsx    # Admin dashboard
│       ├── PortalFeaturedRoutes.jsx
│       ├── PortalTransitRoutes.jsx
│       └── PortalPassengers.jsx
├── src/
│   ├── App.jsx                    # Root component & routing
│   ├── App.css                    # Design system & global styles
│   ├── main.jsx                   # Entry point
│   └── assets/
├── index.html
├── vite.config.js
└── package.json
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** ≥ 18
- **npm** ≥ 9
- Backend server running ([karakoram-express-backend](../karakoram-express-backend))

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/karakoram-express.git
cd karakoram-express

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

### Environment Variables

Create a `.env` file in the root:

```env
VITE_BACKEND_URL=http://localhost:3000
```

### Development

```bash
npm run dev
```

App runs at `http://localhost:5173`

### Production Build

```bash
npm run build
npm run preview
```

## 🗺️ Routing

| Path | Page | Layout |
|---|---|---|
| `/` | Homepage | AppLayout |
| `/aboutus` | About Us | AppLayout |
| `/services` | Services | AppLayout |
| `/offices` | Offices | AppLayout |
| `/booking` | Booking Wizard | AppLayout |
| `/portal/login` | Admin Login | — |
| `/portal` | Admin Dashboard | PortalLayout |
| `/portal/featured-routes` | Manage Featured Routes | PortalLayout |
| `/portal/transit-routes` | Manage Transit Routes | PortalLayout |
| `/portal/passengers` | Passenger Lookup | PortalLayout |

## 🎨 Design System

The UI is built on a **Material Design 3** inspired token system defined in `App.css`:

- **Colors** — Full M3 palette: primary, secondary, tertiary, surface containers, error states (50+ tokens)
- **Typography** — Hanken Grotesk for display/body, JetBrains Mono for labels
- **Spacing** — Consistent scale: `xs(4px)`, `sm(8px)`, `md(16px)`, `lg(24px)`, `xl(48px)`
- **Elevation** — Custom card shadows and booking widget shadow
- **Animations** — Toast entrance, login card entrance, error shake, loading spinner
- **Components** — Glassmorphic navbar with `backdrop-blur`, hero gradient overlays, seat hover states

## 📜 Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## 🔗 Related

- **Backend** — [karakoram-express-backend](https://github.com/your-username/karakoram-express-backend)

## 📄 License

This project is private.

---

<p align="center">Built with ☕ by <strong>Syed Muzammil Ali Shah</strong></p>
