# WokiLite Frontend

Frontend for the WokiLite restaurant reservation system built with Next.js 16, React 19, and TypeScript.

## 📑 Table of Contents

- [🌐 Live Demo](#-live-demo)
- [📋 Prerequisites](#-prerequisites)
- [🚀 Quick Start](#-quick-start)
- [📜 Available Scripts](#-available-scripts)
- [✨ Features](#-features)
- [🛠 Tech Stack](#-tech-stack)
- [📁 Project Structure](#-project-structure)
- [🔌 API Integration](#-api-integration)
- [🧪 Testing](#-testing)
- [🔧 Environment Variables](#-environment-variables)
- [🚀 Deployment](#-deployment)

## 🌐 Live Demo

**Frontend:** [https://wokilite-app.vercel.app/](https://wokilite-app.vercel.app/)  
**Backend API:** [https://wokilite-reservations-production.up.railway.app](https://wokilite-reservations-production.up.railway.app/health)  
**Backend Repository:** [https://github.com/aSampo/wokilite-reservations](https://github.com/aSampo/wokilite-reservations)

## 📋 Prerequisites

- **Node.js** 18.x or higher
- **npm** 9.x or higher (or yarn/pnpm)

## 🚀 Quick Start

1. **Clone the repository**

```bash
git clone <repository-url>
cd wokilite-app
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

```bash
echo "NEXT_PUBLIC_API_URL=https://wokilite-reservations-production.up.railway.app" > .env.local
```

4. **Run development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

5. **Build for production**

```bash
npm run build
npm start
```

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## ✨ Features

- **Day View with Date Navigation** - Browse reservations with prev/next buttons and calendar picker
- **Sector Grouping** - Reservations organized by sectors (Main Hall, Terrace) with visual separation
- **Time Slot Filtering** - Filter reservations by time range (start/end) with 15-minute intervals
- **Create Reservations** - One-click creation with automatic availability checking and intelligent sector retry
- **Delete Reservations** - Remove reservations with confirmation dialog
- **Real-Time Updates** - Automatic cache invalidation with TanStack Query
- **Toast Notifications** - Non-intrusive feedback with Sonner
- **Loading & Error States** - Beautiful loading spinners and error alerts with shadcn/ui

## 🛠 Tech Stack

### Core Framework

- **Next.js 16.1** - React framework with App Router and Server Components
- **React 19** - Latest React with improved concurrent features
- **TypeScript 5** - Type safety and better developer experience

### Styling & UI

- **Tailwind CSS 4** - Utility-first CSS framework
- **shadcn/ui** - Accessible component library (Calendar, Select, Dialog, Toast, Alert)
- **Lucide React** - Icon library

### Utilities

- **date-fns** - Date manipulation with timezone support
- **date-fns-tz** - Timezone utilities
- **Sonner** - Toast notification library
- **Zod** - Schema validation

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx           # Root layout with providers
│   ├── page.tsx             # Home page (Server Component)
│   └── globals.css          # Global styles
├── components/
│   ├── reservations/
│   │   ├── ReservationCard.tsx              # Single reservation + delete button
│   │   ├── ReservationsList.tsx             # Main list orchestration
│   │   ├── ReservationsView.tsx             # Client wrapper with date state
│   │   ├── ReservationsHeader.tsx           # Header with filters
│   │   ├── SectorFilter.tsx                 # Sector dropdown
│   │   ├── SectorSection.tsx                # Sector grouping
│   │   ├── TimeSlotFilter.tsx               # Time range filter
│   │   ├── CreateRandomReservationButton.tsx
│   │   ├── DeleteReservationDialog.tsx      # Confirmation modal
│   │   ├── LoadingState.tsx                 # Loading spinner
│   │   ├── ErrorState.tsx                   # Error alert
│   │   └── EmptyReservationsMessage.tsx      # Empty state message
│   └── ui/                  # shadcn/ui components
├── hooks/
│   ├── useReservations.ts                   # Fetch reservations
│   ├── useReservationsGrouping.ts           # Group by sector
│   ├── useCreateRandomReservation.ts        # Smart creation
│   └── useDeleteReservation.ts              # Delete with toast
├── lib/
│   ├── api/
│   │   ├── client.ts                        # Base API client
│   │   ├── reservations.ts                  # GET /reservations/day
│   │   ├── restaurants.ts                   # GET /restaurants/info
│   │   ├── availability.ts                  # GET /availability
│   │   ├── create-reservation.ts            # POST /reservations
│   │   └── delete-reservation.ts            # DELETE /reservations/:id
│   └── utils/
│       ├── random-data.ts                   # Random customer generator
│       ├── time-format.ts                   # 24h time formatting utilities
│       └── utils.ts                         # cn() helper
├── providers/
│   └── query-provider.tsx   # TanStack Query setup
└── types/
    ├── api.types.ts         # API response types
    └── reservation.types.ts # Domain types
```

## 🔌 API Integration

### Endpoints Used

```typescript
// GET /restaurants/info - Fetched server-side
const restaurantInfo = await getRestaurantInfo("R1");

// GET /reservations/day - Fetched client-side with caching
const { data } = useReservations({ restaurantId, date, sectorId });

// GET /availability - Used when creating reservations
const availability = await getAvailability({
  restaurantId,
  sectorId,
  date,
  partySize,
});

// POST /reservations - Create with idempotency key
await createReservation({
  restaurantId,
  sectorId,
  partySize,
  startDateTimeISO,
  customer,
});

// DELETE /reservations/:id - Soft delete
await deleteReservation(reservationId);
```

## 🧪 Testing

This project uses **Vitest** and **React Testing Library** for automated testing.

### Running Tests

```bash
# Run tests in watch mode
npm test

# Run tests once
npm run test:run

# Run tests with UI
npm run test:ui
```

### Test Setup

- **Vitest** - Fast unit test framework
- **React Testing Library** - Component testing utilities
- **jsdom** - DOM environment for tests
- **@testing-library/jest-dom** - Custom matchers for DOM assertions

### Test Coverage

#### Hooks

- ✅ `useReservationsTimeFiltering` - Time filtering logic with multiple test cases

#### Components

- ✅ `ReservationCard` - Reservation display, singular/plural handling, delete dialog
- ✅ `TimeSlotFilter` - Time slot selection, filtering logic, clear functionality
- ✅ `SectorFilter` - Sector selection and rendering
- ✅ `DeleteReservationDialog` - Confirmation dialog, loading states
- ✅ `CreateRandomReservationButton` - Button rendering, loading states
- ✅ `LoadingState` - Loading spinner and message
- ✅ `ErrorState` - Error message display
- ✅ `EmptyReservationsMessage` - Empty state messages

### Test Statistics

- **Total Test Files**: 9
- **Total Tests**: 42+
- **Coverage**: Core components and hooks tested

## 🔧 Environment Variables

```bash
NEXT_PUBLIC_API_URL=https://wokilite-reservations-production.up.railway.app
```

## 🚀 Deployment

Deployed on **Vercel** with automatic deployments from main branch.

```bash
# Deploy to Vercel
vercel

# Set environment variable
vercel env add NEXT_PUBLIC_API_URL
```
