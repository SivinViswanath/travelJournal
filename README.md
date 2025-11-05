# TravelLog - Travel Journal Application

A full-stack travel journal application inspired by Letterboxd, built with Next.js, Express, and MongoDB. Document your travel memories, upload photos, and organize your adventures.

## 🌟 Features

### ✅ Implemented

- **User Authentication** - Secure JWT-based authentication with cookies
- **Trip Management** - Full CRUD operations for travel entries
- **Image Upload** - Upload and manage multiple photos per trip
- **Search & Filter** - Find trips by title, destination, or description
- **Mobile Responsive** - Fully optimized for mobile, tablet, and desktop
- **Toast Notifications** - Real-time feedback for user actions
- **Security** - Rate limiting, Helmet.js, input validation
- **Modern UI** - Beautiful gradient design with Tailwind CSS

### 🚧 Coming Soon

- Map integration with location markers
- Location-based tourist recommendations
- Social features (share trips, follow travelers)
- PWA support for offline access
- Export trips as PDF

## 🛠️ Tech Stack

### Frontend

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **React Hot Toast** - Toast notifications
- **Axios** - HTTP client
- **Lucide React** - Icon library
- **date-fns** - Date formatting

### Backend

- **Node.js & Express** - Server framework
- **MongoDB & Mongoose** - Database
- **JWT** - Authentication
- **Multer** - File upload handling
- **Helmet** - Security headers
- **Express Rate Limit** - API rate limiting
- **Bcrypt** - Password hashing

## 📦 Installation

### Prerequisites

- Node.js 18+ installed
- MongoDB database (local or MongoDB Atlas)

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd travel-journal
```

### 2. Backend Setup

```bash
cd Server
npm install
```

Create `.env` file in Server directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
CLIENT_URL=http://localhost:3000
NODE_ENV=development

# Optional: For image uploads to Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Start the backend:

```bash
npm run dev
```

### 3. Frontend Setup

```bash
cd Client
npm install
```

Create `.env.local` file in Client directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
```

Start the frontend:

```bash
npm run dev
```

### 4. Access the Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 📱 Mobile Responsiveness

The application is fully responsive with:

- **Mobile-first design** - Optimized for small screens
- **Flexible layouts** - Grid systems adapt to screen size
- **Touch-friendly** - Large tap targets and gestures
- **Readable text** - Appropriate font sizes for all devices
- **Optimized images** - Responsive image loading
- **Hamburger menus** - Compact navigation on mobile

### Breakpoints

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🎨 Design Features

### Color Palette

- Primary: Blue (#0ea5e9)
- Accent: Cyan
- Background: Gradient from blue-50 to cyan-50
- Text: Gray scale

### UI Components

- Gradient backgrounds
- Glassmorphism effects (backdrop blur)
- Smooth transitions and hover effects
- Shadow elevations
- Rounded corners
- Icon-based navigation

## 🔒 Security Features

- **JWT Authentication** - Secure token-based auth
- **HTTP-only Cookies** - Prevents XSS attacks
- **Password Hashing** - Bcrypt with salt rounds
- **Rate Limiting** - 100 requests per 15 minutes
- **Helmet.js** - Security headers
- **Input Validation** - Server-side validation
- **CORS** - Configured for specific origins

## 📁 Project Structure

```
travel-journal/
├── Server/                 # Backend
│   ├── src/
│   │   ├── config/        # Database & Cloudinary config
│   │   ├── controllers/   # Request handlers
│   │   ├── middleware/    # Auth, upload, etc.
│   │   ├── models/        # Mongoose models
│   │   ├── routes/        # API routes
│   │   ├── types/         # TypeScript types
│   │   ├── utils/         # Helper functions
│   │   └── index.ts       # Entry point
│   ├── .env              # Environment variables
│   └── package.json
│
└── Client/                # Frontend
    ├── app/              # Next.js pages
    │   ├── dashboard/   # Protected routes
    │   ├── login/       # Auth pages
    │   ├── register/
    │   ├── layout.tsx   # Root layout
    │   └── page.tsx     # Landing page
    ├── components/      # Reusable components
    ├── contexts/        # React contexts
    ├── lib/            # Utilities
    ├── types/          # TypeScript types
    └── package.json
```

## 🚀 API Endpoints

### Authentication

```
POST /api/v1/auth/register  - Create new user
POST /api/v1/auth/login     - Login user
```

### Trips (Protected)

```
GET    /api/v1/trip          - Get all user trips
GET    /api/v1/trip/:id      - Get single trip
POST   /api/v1/trip          - Create new trip
PUT    /api/v1/trip/:id      - Update trip
DELETE /api/v1/trip/:id      - Delete trip
```

### Images (Protected)

```
POST   /api/v1/trip/:id/images/:imageIndex  - Upload images
DELETE /api/v1/trip/:id/images/:imageIndex  - Delete image
```

## 🧪 Testing the App

1. **Register** a new account at `/register`
2. **Login** with your credentials
3. **Create a trip** from the dashboard
4. **Upload photos** to your trip
5. **Search** for trips using the search bar
6. **Edit or delete** trips as needed

## 📝 Environment Variables

### Backend (.env)

| Variable       | Description               | Required |
| -------------- | ------------------------- | -------- |
| PORT           | Server port               | Yes      |
| MONGO_URI      | MongoDB connection string | Yes      |
| JWT_SECRET     | Secret for JWT tokens     | Yes      |
| CLIENT_URL     | Frontend URL for CORS     | Yes      |
| CLOUDINARY\_\* | Cloudinary credentials    | Optional |

### Frontend (.env.local)

| Variable            | Description     | Required |
| ------------------- | --------------- | -------- |
| NEXT_PUBLIC_API_URL | Backend API URL | Yes      |

## 🐛 Troubleshooting

### Backend won't start

- Check MongoDB connection string
- Ensure all required env variables are set
- Verify port 5000 is available

### Frontend won't start

- Run `npm install` in Client folder
- Check that backend is running
- Verify API URL in .env.local

### CORS errors

- Ensure CLIENT_URL in backend .env matches frontend URL
- Check that credentials are enabled in CORS config

### Image upload not working

- Cloudinary credentials are optional
- App uses placeholder images by default
- Configure Cloudinary for production use

## 🎯 Future Enhancements

See `IMPROVEMENTS.md` for detailed roadmap including:

- Google Maps integration
- Location-based recommendations
- Social features
- PWA capabilities
- Analytics dashboard
- Export to PDF

## 📄 License

MIT License - feel free to use this project for learning or personal use.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For issues or questions, please open an issue on GitHub.

---

Built with ❤️ for travelers who love to document their journeys.
