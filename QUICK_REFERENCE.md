# Quick Reference Card

## 🚀 Getting Started (5 Minutes)

### 1. Start Backend

```bash
cd Server
npm install
npm run dev
```

✅ Server running on http://localhost:5000

### 2. Start Frontend

```bash
cd Client
npm install
npm run dev
```

✅ App running on http://localhost:3000

### 3. Configure MongoDB

Update `Server/.env`:

```env
MONGO_URI=your_mongodb_connection_string
```

## 📁 Project Structure

```
travel-journal/
├── Server/          # Backend (Express + MongoDB)
│   ├── src/
│   │   ├── controllers/  # Business logic
│   │   ├── models/       # Database schemas
│   │   ├── routes/       # API endpoints
│   │   └── middleware/   # Auth, upload, etc.
│   └── .env         # Environment variables
│
└── Client/          # Frontend (Next.js)
    ├── app/         # Pages (App Router)
    ├── components/  # Reusable components
    ├── contexts/    # React contexts
    └── types/       # TypeScript types
```

## 🔑 Key Files

| File                                | Purpose                |
| ----------------------------------- | ---------------------- |
| `Server/src/index.ts`               | Backend entry point    |
| `Server/src/models/Trip.ts`         | Trip database model    |
| `Client/app/page.tsx`               | Landing page           |
| `Client/app/dashboard/page.tsx`     | Main dashboard         |
| `Client/contexts/AuthContext.tsx`   | Authentication logic   |
| `Client/components/ImageUpload.tsx` | Image upload component |

## 🌐 API Endpoints

### Auth

```
POST /api/v1/auth/register  # Create account
POST /api/v1/auth/login     # Login
```

### Trips (Protected)

```
GET    /api/v1/trip         # Get all trips
GET    /api/v1/trip/:id     # Get one trip
POST   /api/v1/trip         # Create trip
PUT    /api/v1/trip/:id     # Update trip
DELETE /api/v1/trip/:id     # Delete trip
```

### Images (Protected)

```
POST   /api/v1/trip/:id/images/:imageIndex  # Upload images
DELETE /api/v1/trip/:id/images/:imageIndex  # Delete image
```

## 🎨 Tailwind Classes Reference

### Responsive Breakpoints

```tsx
sm:   // 640px+  (tablets)
md:   // 768px+  (tablets landscape)
lg:   // 1024px+ (laptops)
xl:   // 1280px+ (desktops)
```

### Common Patterns

```tsx
// Responsive text
className = 'text-xl sm:text-2xl lg:text-3xl';

// Responsive grid
className = 'grid sm:grid-cols-2 lg:grid-cols-3';

// Responsive spacing
className = 'px-4 sm:px-6 lg:px-8';
className = 'py-6 sm:py-12';

// Responsive flex
className = 'flex flex-col sm:flex-row';
```

### Color Palette

```tsx
primary - 600; // #0284c7 (Blue)
primary - 700; // #0369a1 (Dark Blue)
gray - 600; // #4b5563 (Text)
gray - 900; // #111827 (Headings)
red - 600; // #dc2626 (Errors)
green - 600; // #16a34a (Success)
```

## 🔧 Common Commands

### Backend

```bash
npm run dev      # Development server
npm run build    # Build for production
npm run serve    # Run production build
```

### Frontend

```bash
npm run dev      # Development server
npm run build    # Build for production
npm start        # Run production build
npm run lint     # Check code quality
```

## 🐛 Troubleshooting

### Backend Issues

```bash
# MongoDB connection error
# → Check MONGO_URI in .env

# Port already in use
# → Change PORT in .env

# Module not found
# → Run: npm install
```

### Frontend Issues

```bash
# Module not found
# → Run: npm install

# CORS error
# → Check CLIENT_URL in Server/.env

# TypeScript errors
# → Restart IDE/editor
```

## 📱 Testing on Mobile

### Find Your IP

```bash
# Windows
ipconfig

# Mac/Linux
ifconfig
```

### Update Backend

```env
# Server/.env
CLIENT_URL=http://YOUR_IP:3000
```

### Access from Phone

```
http://YOUR_IP:3000
```

## 🎯 Key Features

✅ User authentication (JWT)
✅ Trip CRUD operations
✅ Image upload (multiple)
✅ Search & filter
✅ Mobile responsive
✅ Toast notifications
✅ Loading states
✅ Error handling

## 📚 Documentation Files

| File                         | Content                        |
| ---------------------------- | ------------------------------ |
| `README.md`                  | Complete project documentation |
| `setup.md`                   | Step-by-step setup guide       |
| `IMPROVEMENTS.md`            | Future enhancement ideas       |
| `COMPLETED_FEATURES.md`      | What's been implemented        |
| `MOBILE_RESPONSIVE_GUIDE.md` | Responsive design details      |
| `QUICK_REFERENCE.md`         | This file!                     |

## 🔐 Environment Variables

### Backend (.env)

```env
PORT=5000
MONGO_URI=mongodb://...
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:3000
NODE_ENV=development

# Optional
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```

### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
```

## 🎨 Component Examples

### Button

```tsx
<button className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition">
  Click Me
</button>
```

### Input

```tsx
<input
  type="text"
  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
  placeholder="Enter text..."
/>
```

### Card

```tsx
<div className="bg-white rounded-xl shadow-lg p-6">{/* Content */}</div>
```

### Grid

```tsx
<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">{/* Items */}</div>
```

## 🚀 Deployment Quick Guide

### Backend (Railway/Render)

1. Push to GitHub
2. Connect repository
3. Set environment variables
4. Deploy

### Frontend (Vercel)

1. Push to GitHub
2. Import to Vercel
3. Set NEXT_PUBLIC_API_URL
4. Deploy

## 💡 Pro Tips

1. **Use search** - Find trips quickly with the search bar
2. **Mobile first** - Design looks great on phones
3. **Toast feedback** - Watch for success/error messages
4. **Image preview** - See images before uploading
5. **Keyboard shortcuts** - Tab through forms efficiently

## 📞 Need Help?

1. Check browser console (F12)
2. Check terminal for errors
3. Review documentation files
4. Verify environment variables
5. Restart servers

## 🎓 Learning Resources

- **Next.js**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **MongoDB**: https://docs.mongodb.com
- **Express**: https://expressjs.com
- **TypeScript**: https://www.typescriptlang.org/docs

## ✨ Quick Wins

Want to customize? Try these:

- Change colors in `tailwind.config.ts`
- Update logo text in navigation
- Modify gradient backgrounds
- Add more trip fields
- Customize toast messages

---

**Happy Coding!** 🚀

For detailed information, see `README.md` and other documentation files.
