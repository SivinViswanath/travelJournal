# Deployment Checklist

## Pre-Deployment Checklist

### ✅ Code Quality

- [ ] All TypeScript errors resolved
- [ ] No console errors in browser
- [ ] No console warnings in terminal
- [ ] Code is properly formatted
- [ ] All features tested locally

### ✅ Environment Variables

- [ ] Backend .env configured
- [ ] Frontend .env.local configured
- [ ] No sensitive data in code
- [ ] .env files in .gitignore

### ✅ Security

- [ ] JWT_SECRET is strong and unique
- [ ] CORS configured for production domain
- [ ] Rate limiting enabled
- [ ] Helmet.js configured
- [ ] Input validation in place

### ✅ Database

- [ ] MongoDB connection tested
- [ ] Database indexes created
- [ ] Backup strategy planned
- [ ] Connection string secured

### ✅ Testing

- [ ] User registration works
- [ ] User login works
- [ ] Trip CRUD operations work
- [ ] Image upload works
- [ ] Search functionality works
- [ ] Mobile responsiveness verified

## Backend Deployment

### Option 1: Railway

#### Steps

1. **Create Account**

   - Go to https://railway.app
   - Sign up with GitHub

2. **Create New Project**

   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository
   - Select Server folder

3. **Configure Environment Variables**

   ```env
   PORT=5000
   MONGO_URI=your_production_mongodb_uri
   JWT_SECRET=your_strong_secret_key
   CLIENT_URL=https://your-frontend-domain.vercel.app
   NODE_ENV=production
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

4. **Configure Build**

   - Root Directory: `Server`
   - Build Command: `npm run build`
   - Start Command: `npm run serve`

5. **Deploy**
   - Click "Deploy"
   - Wait for deployment
   - Copy the deployment URL

#### Post-Deployment

- [ ] Test API endpoints
- [ ] Check logs for errors
- [ ] Verify database connection
- [ ] Test CORS with frontend

### Option 2: Render

#### Steps

1. **Create Account**

   - Go to https://render.com
   - Sign up with GitHub

2. **Create Web Service**

   - Click "New +"
   - Select "Web Service"
   - Connect GitHub repository

3. **Configure Service**

   - Name: `travel-journal-api`
   - Root Directory: `Server`
   - Environment: `Node`
   - Build Command: `npm install && npm run build`
   - Start Command: `npm run serve`

4. **Add Environment Variables**

   - Same as Railway above

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment

### Option 3: Heroku

#### Steps

1. **Install Heroku CLI**

   ```bash
   npm install -g heroku
   ```

2. **Login**

   ```bash
   heroku login
   ```

3. **Create App**

   ```bash
   cd Server
   heroku create travel-journal-api
   ```

4. **Set Environment Variables**

   ```bash
   heroku config:set MONGO_URI=your_uri
   heroku config:set JWT_SECRET=your_secret
   heroku config:set CLIENT_URL=your_frontend_url
   heroku config:set NODE_ENV=production
   ```

5. **Deploy**
   ```bash
   git push heroku main
   ```

## Frontend Deployment

### Vercel (Recommended)

#### Steps

1. **Create Account**

   - Go to https://vercel.com
   - Sign up with GitHub

2. **Import Project**

   - Click "Add New..."
   - Select "Project"
   - Import your GitHub repository

3. **Configure Project**

   - Framework Preset: Next.js
   - Root Directory: `Client`
   - Build Command: `npm run build`
   - Output Directory: `.next`

4. **Environment Variables**

   ```env
   NEXT_PUBLIC_API_URL=https://your-backend-url.railway.app/api/v1
   ```

5. **Deploy**
   - Click "Deploy"
   - Wait for deployment
   - Copy the deployment URL

#### Post-Deployment

- [ ] Update backend CLIENT_URL
- [ ] Test all features
- [ ] Check mobile responsiveness
- [ ] Verify API calls work

### Alternative: Netlify

#### Steps

1. **Create Account**

   - Go to https://netlify.com
   - Sign up with GitHub

2. **Import Project**

   - Click "Add new site"
   - Import from Git
   - Select repository

3. **Configure Build**

   - Base directory: `Client`
   - Build command: `npm run build`
   - Publish directory: `.next`

4. **Environment Variables**

   - Add NEXT_PUBLIC_API_URL

5. **Deploy**
   - Click "Deploy site"

## Database Setup

### MongoDB Atlas (Recommended)

#### Steps

1. **Create Account**

   - Go to https://www.mongodb.com/cloud/atlas
   - Sign up for free

2. **Create Cluster**

   - Choose free tier (M0)
   - Select region closest to your users
   - Create cluster

3. **Create Database User**

   - Database Access → Add New User
   - Choose password authentication
   - Save username and password

4. **Configure Network Access**

   - Network Access → Add IP Address
   - Allow access from anywhere (0.0.0.0/0)
   - Or add specific IPs

5. **Get Connection String**

   - Clusters → Connect
   - Choose "Connect your application"
   - Copy connection string
   - Replace `<password>` with your password

6. **Update Environment Variables**
   - Add connection string to backend .env

## Post-Deployment Verification

### Backend Checks

- [ ] Health endpoint works: `GET /health`
- [ ] API responds correctly
- [ ] Database connection successful
- [ ] CORS allows frontend requests
- [ ] Rate limiting works
- [ ] Error handling works

### Frontend Checks

- [ ] Site loads correctly
- [ ] All pages accessible
- [ ] Images load properly
- [ ] API calls successful
- [ ] Authentication works
- [ ] Mobile responsive

### Full Flow Test

- [ ] Register new account
- [ ] Login with credentials
- [ ] Create a trip
- [ ] Upload images
- [ ] Edit trip
- [ ] Search trips
- [ ] Delete trip
- [ ] Logout

## Performance Optimization

### Backend

- [ ] Enable compression
- [ ] Add caching headers
- [ ] Optimize database queries
- [ ] Use CDN for images
- [ ] Monitor response times

### Frontend

- [ ] Optimize images
- [ ] Enable caching
- [ ] Minimize bundle size
- [ ] Use lazy loading
- [ ] Add service worker (PWA)

## Monitoring & Maintenance

### Set Up Monitoring

- [ ] Error tracking (Sentry)
- [ ] Uptime monitoring (UptimeRobot)
- [ ] Analytics (Google Analytics)
- [ ] Performance monitoring (Vercel Analytics)

### Regular Maintenance

- [ ] Check error logs weekly
- [ ] Update dependencies monthly
- [ ] Backup database regularly
- [ ] Monitor disk space
- [ ] Review security updates

## Domain Configuration (Optional)

### Custom Domain

1. **Purchase Domain**

   - Namecheap, GoDaddy, etc.

2. **Configure DNS**

   - Add A record for backend
   - Add CNAME for frontend

3. **Update Environment Variables**

   - Update CLIENT_URL in backend
   - Update NEXT_PUBLIC_API_URL in frontend

4. **Enable HTTPS**
   - Vercel/Railway handle this automatically
   - Or use Let's Encrypt

## Security Checklist

### Production Security

- [ ] HTTPS enabled
- [ ] Strong JWT secret
- [ ] Rate limiting active
- [ ] CORS properly configured
- [ ] Input validation enabled
- [ ] SQL injection prevention
- [ ] XSS protection
- [ ] CSRF protection
- [ ] Secure headers (Helmet)
- [ ] Environment variables secured

## Rollback Plan

### If Deployment Fails

1. **Check Logs**

   - Review deployment logs
   - Check error messages

2. **Verify Environment Variables**

   - Ensure all variables set
   - Check for typos

3. **Test Locally**

   - Pull latest code
   - Test in production mode

4. **Rollback**
   - Revert to previous deployment
   - Fix issues locally
   - Redeploy

## Cost Estimation

### Free Tier Options

- **MongoDB Atlas**: 512MB free
- **Railway**: $5 credit/month
- **Vercel**: Unlimited for personal
- **Render**: 750 hours/month free

### Paid Options (if needed)

- **MongoDB Atlas**: $9/month (M10)
- **Railway**: Pay as you go
- **Vercel**: $20/month (Pro)
- **Cloudinary**: $0.0004/image

## Final Checklist

### Before Going Live

- [ ] All features tested
- [ ] Mobile responsive verified
- [ ] Performance optimized
- [ ] Security measures in place
- [ ] Monitoring set up
- [ ] Backup strategy ready
- [ ] Documentation updated
- [ ] Team notified

### After Going Live

- [ ] Monitor for errors
- [ ] Check user feedback
- [ ] Verify analytics
- [ ] Test all features again
- [ ] Announce launch
- [ ] Gather user feedback

## Support & Maintenance

### Regular Tasks

- **Daily**: Check error logs
- **Weekly**: Review analytics
- **Monthly**: Update dependencies
- **Quarterly**: Security audit

### Emergency Contacts

- Database: MongoDB Atlas support
- Hosting: Railway/Vercel support
- Domain: Registrar support

## Success Metrics

### Track These Metrics

- [ ] Uptime percentage
- [ ] Response time
- [ ] Error rate
- [ ] User registrations
- [ ] Active users
- [ ] Trips created
- [ ] Images uploaded

---

## 🎉 Deployment Complete!

Once all checkboxes are marked, your app is live and ready for users!

**Next Steps:**

1. Share with friends and family
2. Gather feedback
3. Implement improvements
4. Scale as needed

**Congratulations on deploying your travel journal app!** 🚀
