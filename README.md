# WokiLite App - Frontend

Restaurant reservation management dashboard built with Next.js 16 and TanStack Query.

## Tech Stack

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type safety
- **TanStack Query** - Data fetching and caching
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **date-fns** - Date manipulation

## Getting Started

### Prerequisites

- Node.js 20+
- npm

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env.local` file in the root directory:

```bash
NEXT_PUBLIC_API_URL=https://wokilite-reservations-production.up.railway.app
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

## API

Backend API is deployed on Railway: [https://wokilite-reservations-production.up.railway.app](https://wokilite-reservations-production.up.railway.app/health)

## Project Structure

```
src/
├── app/              # Next.js app router pages
├── components/       # React components
│   └── ui/          # shadcn/ui components
├── hooks/           # React Query hooks
├── lib/
│   └── api/         # API client layer
├── providers/       # React context providers
└── types/           # TypeScript type definitions
```

## Features

- [x] List reservations by day
- [ ] Filter by sector
- [ ] Create reservations
- [ ] Delete reservations
- [ ] Real-time updates

## License

MIT
