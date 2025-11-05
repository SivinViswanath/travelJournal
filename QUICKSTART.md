# Quick Start Guide

## Setup Instructions

### 1. Backend Setup (Already Done ✓)

Your backend is already configured. Just make sure it's running:

```bash
cd Server
npm run dev
```

The server should start on `http://localhost:5000`

### 2. Frontend Setup (New)

Install dependencies and start the frontend:

```bash
cd Client
npm install
npm run dev
```

The app will be available at `http://localhost:3000`

## Testing the Application

1. **Open your browser** to `http://localhost:3000`

2. **Create an account:**

   - Click "Sign Up"
   - Enter your name, email, and password
   - You'll be redirected to the dashboard

3. **Add your first trip:**

   - Click "Add Trip" button
   - Fill in trip details (title, destination, dates, description)
   - Click "Create Trip"

4. **View and manage trips:**
   - See all your trips on the dashboard
   - Click "View" to see trip details
   - Click "Edit" to modify a trip
   - Click "Delete" to remove a trip

## What's Working Now

✅ User registration and login
✅ Create, read, update, delete trips
✅ Beautiful responsive UI
✅ Protected routes (authentication required)
✅ Date formatting and validation
✅ Error handling and loading states

## What Needs to Be Added

See `IMPROVEMENTS.md` for detailed recommendations. Top priorities:

1. **Image Upload** - Add photos to your trips
2. **Map Integration** - Show trip locations on a map
3. **Location Recommendations** - Get tourist attraction suggestions
4. **Search & Filter** - Find trips easily
5. **PWA Features** - Install as mobile app

## Project Structure

```
.
├── Server/                 # Backend (Express + MongoDB)
│   ├── src/
│   │   ├── controllers/   # Request handlers
│   │   ├── models/        # Database models
│   │   ├── routes/        # API routes
│   │   └── middleware/    # Auth middleware
│   └── .env              # Environment variables
│
└── Client/                # Frontend (Next.js)
    ├── app/              # Pages and routes
    ├── contexts/         # React contexts
    ├── lib/             # Utilities
    └── types/           # TypeScript types
```

## API Endpoints

### Authentication

- `POST /api/v1/auth/register` - Create new user
- `POST /api/v1/auth/login` - Login user

### Trips (Protected)

- `GET /api/v1/trip` - Get all user trips
- `GET /api/v1/trip/:id` - Get single trip
- `POST /api/v1/trip` - Create new trip
- `PUT /api/v1/trip/:id` - Update trip
- `DELETE /api/v1/trip/:id` - Delete trip

## Troubleshooting

### Backend won't start

- Check MongoDB connection string in `Server/.env`
- Ensure MongoDB is running
- Run `npm install` in Server folder

### Frontend won't start

- Run `npm install` in Client folder
- Check that backend is running on port 5000
- Verify `.env.local` has correct API URL

### CORS errors

- Backend is configured for `http://localhost:3000`
- If using different port, update `Server/.env` CLIENT_URL

### Authentication issues

- Clear browser cookies
- Check browser console for errors
- Verify JWT_SECRET is set in backend .env

## Next Steps

1. **Test the current features** thoroughly
2. **Review IMPROVEMENTS.md** for enhancement ideas
3. **Choose priority features** to implement next
4. **Set up image upload** (recommended first addition)
5. **Add map integration** for location features

## Need Help?

- Check browser console for frontend errors
- Check server terminal for backend errors
- Review the code comments for implementation details
- Refer to IMPROVEMENTS.md for feature implementation guides
