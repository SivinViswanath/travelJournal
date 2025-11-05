# Travel Journal Frontend

A modern Next.js web application for documenting travel memories, built with TypeScript and Tailwind CSS.

## Features

- 🔐 User authentication (login/register)
- 📝 Create, read, update, and delete travel entries
- 📅 Track trip dates and destinations
- 🎨 Beautiful, responsive UI with Tailwind CSS
- 🚀 Built with Next.js 15 App Router

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Backend server running on `http://localhost:5000`

### Installation

1. Install dependencies:

```bash
npm install
```

2. Create `.env.local` file (already created):

```
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
Client/
├── app/                      # Next.js App Router pages
│   ├── dashboard/           # Protected dashboard routes
│   │   └── trips/          # Trip management pages
│   ├── login/              # Login page
│   ├── register/           # Registration page
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Landing page
│   └── globals.css         # Global styles
├── contexts/               # React contexts
│   └── AuthContext.tsx    # Authentication context
├── lib/                   # Utilities
│   └── api.ts            # Axios API client
├── types/                # TypeScript types
│   └── index.ts         # Shared types
└── public/              # Static assets
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **date-fns** - Date formatting
- **lucide-react** - Icon library
