# WokiLite Frontend

Modern frontend for the WokiLite restaurant reservation system built with Next.js 16, React 19, and TypeScript.

## 🌐 Live Demo

**Frontend:** [https://wokilite-app.vercel.app/](https://wokilite-app.vercel.app/)  
**Backend API:** [https://wokilite-reservations-production.up.railway.app](https://wokilite-reservations-production.up.railway.app/health)  
**Backend Repository:** [https://github.com/aSampo/wokilite-reservations](https://github.com/aSampo/wokilite-reservations)

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Set environment variable
echo "NEXT_PUBLIC_API_URL=https://wokilite-reservations-production.up.railway.app" > .env.local

# Run development server
npm run dev

# Build for production
npm run build
npm start
```

## ✨ Features

### Core Functionality

- **Day View with Date Navigation** - Browse reservations with prev/next buttons and calendar picker
- **Sector Grouping** - Reservations organized by sectors (Main Hall, Terrace) with visual separation
- **Server-Side Filtering** - Filter by sector using backend API for better performance
- **Time Slot Filtering** - Filter reservations by time range (start/end) with 15-minute intervals
- **Real-Time Updates** - Automatic cache invalidation with TanStack Query
- **Toast Notifications** - Non-intrusive feedback with Sonner
- **Loading & Error States** - Beautiful loading spinners and error alerts with shadcn/ui

### Smart Reservation Management

- **Create Test Reservations** - One-click creation with automatic availability checking
- **Intelligent Sector Retry** - Tries all sectors until finding availability
- **Delete Reservations** - Remove reservations with confirmation dialog

## 🛠 Tech Stack

- **Next.js 16.1** - React framework with App Router and Server Components
- **React 19** - Latest React with improved concurrent features
- **TypeScript 5** - Type safety
- **Tailwind CSS 4** - Utility-first styling
- **shadcn/ui** - Accessible component library (Calendar, Select, Dialog, Toast, Alert)
- **TanStack Query v5** - Server state management with caching
- **date-fns** - Date manipulation with timezone support

### Key Design Decisions

#### Server Components + Client Components

- Restaurant info fetched server-side for better performance and SEO
- Date selection and filtering handled in client components
- Less JavaScript sent to client

#### TanStack Query for Caching

- Automatic caching by `[restaurantId, date, sectorId]`
- Smart invalidation on create/delete
- Built-in loading and error states

#### Server-Side Filtering

- Pass `sectorId` to backend instead of filtering client-side
- Reduces network payload
- Better scalability with large datasets

#### Smart Reservation Creation

1. Generate random party size (2-8 people)
2. Shuffle sectors randomly
3. For each sector:
   - Check availability
   - If slot found → Create reservation
   - If not → Try next sector
4. If no sector has space → Show error

#### Delete with Confirmation

- Hover to reveal delete button (trash icon)
- AlertDialog for confirmation
- Shows customer name to prevent mistakes
- Loading state during deletion
- Toast notification on success/error

#### Time Slot Filtering

- Two dropdowns: start time and end time
- **Dynamic slots**: only shows time slots that have actual reservations
- Optional filtering: can filter by start only, end only, or both
- Client-side filtering for instant feedback
- Clear button to reset filters
- Auto-hides when no reservations exist
- Shows appropriate message when no reservations match the filter

## 🎯 BONUS Features Implemented

### BONUS 1: Frontend Demo ✅

- ✅ Day view grouped by sector with visual separation
- ✅ Date navigation (prev/next + calendar picker)
- ✅ Time slot filtering (start/end time with 15-min intervals)
- ✅ Live updates on date change
- ✅ Create random/sample reservation button
- ✅ Delete reservation with confirmation
- ✅ Smart availability checking with sector retry
- ✅ Sector filtering with server-side support
- ✅ Toast notifications

### BONUS 2: Public Deploy ✅

- Deployed on Vercel: [https://wokilite-app.vercel.app/](https://wokilite-app.vercel.app/)
- Automatic deployments from main branch
- Environment variables configured
- Production-ready build

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

### Manual Testing Workflow

1. **Date Navigation** - Click prev/next, select from calendar, verify updates
2. **Sector Filtering** - Select sector, verify only that sector shows
3. **Create Reservation** - Click button, verify loading, check toast, confirm in list
4. **Delete Reservation** - Hover card, click trash, confirm dialog, verify removal
5. **Timezone** - Create for today, verify appears on correct date

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

## 🎨 UI/UX Highlights

- **Responsive Grid** - 1-4 columns based on screen size
- **Hover Effects** - Delete button appears on hover
- **Visual Hierarchy** - Sector sections with gradient backgrounds
- **Accessibility** - Keyboard navigation, ARIA labels, focus management
- **Loading States** - Animated spinners with lucide-react icons
- **Error States** - Beautiful error alerts with shadcn/ui Alert component
- **24-Hour Time Format** - Consistent time display across the app

## 🧰 Tools & Credits

- **shadcn/ui** - Component library
- **TanStack Query** - Server state management
- **date-fns** - Date manipulation
- **Sonner** - Toast notifications
- **Lucide React** - Icons
- **Cursor AI** - Development assistance

## 📝 Known Limitations

- No authentication (public access)
- Single restaurant support (hardcoded "R1")
- No offline support
- UI in Spanish only

## 📄 License

This project is part of the WokiLite challenge.
