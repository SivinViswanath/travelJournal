# Quick Setup Guide

## Step-by-Step Setup

### 1. Install Backend Dependencies

```bash
cd Server
npm install
```

### 2. Configure Backend Environment

The `.env` file is already created in `Server/.env`. Update these values:

```env
MONGO_URI=your_mongodb_connection_string_here
```

Get your MongoDB connection string from:

- **MongoDB Atlas** (free): https://www.mongodb.com/cloud/atlas
- Or use local MongoDB: `mongodb://localhost:27017/travel-journal`

### 3. Start Backend Server

```bash
# From Server directory
npm run dev
```

You should see: `Server running on port 5000`

### 4. Install Frontend Dependencies

Open a new terminal:

```bash
cd Client
npm install
```

This will install all required packages including:

- Next.js, React, TypeScript
- Tailwind CSS
- Axios, React Hot Toast
- Lucide React icons
- date-fns

### 5. Start Frontend Development Server

```bash
# From Client directory
npm run dev
```

You should see: `Ready on http://localhost:3000`

### 6. Open the Application

Visit http://localhost:3000 in your browser

## Testing the Application

### Create Your First Account

1. Click "Sign Up" button
2. Enter your name, email, and password
3. You'll be redirected to the dashboard

### Add Your First Trip

1. Click "Add Trip" button
2. Fill in:
   - Trip title (e.g., "Summer in Paris")
   - Destination (e.g., "Paris, France")
   - Start and end dates
   - Description of your trip
3. Click "Create Trip"

### Upload Photos

1. Click on a trip to view details
2. Click "Add Photos"
3. Drag and drop images or click to browse
4. Click "Upload" button

### Search Your Trips

1. Use the search bar on the dashboard
2. Search by title, destination, or description
3. Results update in real-time

## Mobile Testing

### Test on Your Phone

1. Find your computer's local IP address:

   - Windows: `ipconfig` (look for IPv4)
   - Mac/Linux: `ifconfig` or `ip addr`

2. Update backend `.env`:

   ```env
   CLIENT_URL=http://YOUR_IP:3000
   ```

3. Access from phone:
   ```
   http://YOUR_IP:3000
   ```

### Test Responsive Design

In browser:

1. Open DevTools (F12)
2. Click device toolbar icon
3. Select different devices (iPhone, iPad, etc.)

## Common Issues & Solutions

### Backend won't start

**Error: "Cannot connect to MongoDB"**

- Check your MONGO_URI in `.env`
- Ensure MongoDB is running (if local)
- Check network connection (if using Atlas)

**Error: "Port 5000 already in use"**

- Change PORT in `.env` to another port (e.g., 5001)
- Update NEXT_PUBLIC_API_URL in Client/.env.local

### Frontend won't start

**Error: "Module not found"**

```bash
cd Client
rm -rf node_modules package-lock.json
npm install
```

**Error: "Cannot find module 'next/navigation'"**

- Make sure you ran `npm install` in Client folder
- Restart your IDE/editor

### CORS Errors

**Error: "Access-Control-Allow-Origin"**

- Check CLIENT_URL in Server/.env matches your frontend URL
- Restart backend server after changing .env

### Image Upload Not Working

- Image upload uses placeholder URLs by default
- For production, configure Cloudinary:
  1. Sign up at https://cloudinary.com
  2. Add credentials to Server/.env
  3. Restart backend

## Production Deployment

### Backend (Railway, Render, or Heroku)

1. Push code to GitHub
2. Connect repository to hosting platform
3. Set environment variables
4. Deploy

### Frontend (Vercel - Recommended)

1. Push code to GitHub
2. Import project to Vercel
3. Set NEXT_PUBLIC_API_URL to your backend URL
4. Deploy

### Environment Variables for Production

Backend:

```env
NODE_ENV=production
MONGO_URI=your_production_mongodb_uri
JWT_SECRET=your_strong_secret_key
CLIENT_URL=https://your-frontend-domain.com
```

Frontend:

```env
NEXT_PUBLIC_API_URL=https://your-backend-domain.com/api/v1
```

## Development Tips

### Hot Reload

Both frontend and backend support hot reload:

- Backend: Changes auto-restart with `tsx watch`
- Frontend: Changes auto-refresh in browser

### Debugging

**Backend:**

- Check terminal for error messages
- Add `console.log()` in controllers
- Use Postman to test API endpoints

**Frontend:**

- Open browser DevTools (F12)
- Check Console tab for errors
- Use React DevTools extension

### Code Quality

```bash
# Frontend linting
cd Client
npm run lint

# Backend type checking
cd Server
npm run build
```

## Next Steps

1. ✅ Get the app running locally
2. ✅ Create test account and trips
3. ✅ Test on mobile device
4. 📖 Read `IMPROVEMENTS.md` for feature ideas
5. 🚀 Deploy to production
6. 🎨 Customize design and features

## Need Help?

- Check `README.md` for detailed documentation
- Review `IMPROVEMENTS.md` for enhancement ideas
- Check browser console for frontend errors
- Check terminal for backend errors

## Useful Commands

```bash
# Backend
cd Server
npm run dev          # Start development server
npm run build        # Build for production
npm run serve        # Run production build

# Frontend
cd Client
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Run production build
npm run lint         # Check code quality
```

Happy coding! 🚀
