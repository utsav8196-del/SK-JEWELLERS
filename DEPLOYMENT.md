# SK Jewellers - Deployment Guide

## Overview
This guide covers deploying SK Jewellers with a React frontend on Vercel and Express.js backend on Render with MongoDB Atlas database.

## Prerequisites
- GitHub account
- Vercel account
- Render account
- MongoDB Atlas account
- Domain (optional)

## Step 1: Setup MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster (free tier available)
3. Create a database user with strong password
4. Whitelist your IP address or allow all (0.0.0.0/0 for development)
5. Get the connection string: `mongodb+srv://username:password@cluster.mongodb.net/sk_jewellers`

## Step 2: Prepare Backend for Deployment

### Local Setup
1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Create `.env` file:
   ```env
   PORT=5000
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/sk_jewellers
   NODE_ENV=production
   JWT_SECRET=generate-a-strong-secret-key-here
   JWT_REFRESH_SECRET=generate-another-secret-key-here
   FRONTEND_URL=https://yourdomain.com
   ```

3. Test locally:
   ```bash
   npm install
   npm start
   ```

4. Run admin setup:
   ```bash
   node scripts/setupAdmin.js
   ```

### Push to GitHub
1. Initialize git in backend if needed:
   ```bash
   git init
   ```

2. Commit and push to GitHub

## Step 3: Deploy Backend to Render

### Via Render Dashboard
1. Go to [Render](https://render.com)
2. Click "New +" and select "Web Service"
3. Connect your GitHub repository
4. Select the backend branch
5. Configure:
   - **Name**: `sk-jewellers-backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Root Directory**: `backend` (if monorepo)

6. Add Environment Variables:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: Strong secret key
   - `JWT_REFRESH_SECRET`: Another secret key
   - `NODE_ENV`: `production`
   - `FRONTEND_URL`: Your frontend domain

7. Click "Create Web Service"

8. Wait for deployment (takes 1-2 minutes)

9. Get your backend URL (e.g., `https://sk-jewellers-backend.onrender.com`)

## Step 4: Prepare Frontend for Deployment

### Update Environment Variables
1. Create `.env.production` in project root:
   ```env
   VITE_API_URL=https://sk-jewellers-backend.onrender.com/api
   ```

2. Or set via Vercel dashboard later

### Verify Package.json
The package.json already has:
- Build script: `npm run build`
- All necessary dependencies including axios

## Step 5: Deploy Frontend to Vercel

### Via Vercel Dashboard
1. Go to [Vercel](https://vercel.com)
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Detect automatically (should pick Vite)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

5. Add Environment Variables:
   - `VITE_API_URL`: Your Render backend URL

6. Click "Deploy"

7. Wait for deployment (usually 2-3 minutes)

## Step 6: Update CORS and Security

### Backend (on Render)
Update environment variable on Render dashboard:
```
FRONTEND_URL=https://your-vercel-domain.vercel.app
```

This will update CORS settings to allow requests from your frontend.

### Frontend
Ensure you're using the correct API URL in environment variables.

## Step 7: Test the Application

1. Visit your frontend: `https://your-domain.vercel.app`
2. Navigate to login page
3. Use demo credentials:
   - Username: `admin`
   - Password: `admin123`
4. You should see the admin dashboard

## Step 8: Custom Domain (Optional)

### For Vercel Frontend
1. Go to Vercel project settings
2. Click "Domains"
3. Add your custom domain
4. Update DNS records as instructed
5. Enable automatic HTTPS

### For Render Backend
1. Go to Render service settings
2. Add custom domain
3. Update DNS CNAME record

## Troubleshooting

### Backend won't start
- Check MongoDB URI is correct
- Verify JWT secrets are set
- Check logs on Render dashboard

### Frontend can't connect to backend
- Verify VITE_API_URL in Vercel environment variables
- Check backend CORS settings
- Ensure FRONTEND_URL matches your domain

### Admin login fails
- Verify backend is running: Visit `https://your-backend-url/api/health`
- Check admin user exists: Run `node scripts/setupAdmin.js` again
- Review backend logs

### MongoDB connection fails
- Verify connection string is correct
- Check IP whitelist in MongoDB Atlas
- Ensure database user has permissions

## Production Checklist

- [ ] Change default admin password
- [ ] Set strong JWT secrets
- [ ] Enable HTTPS (automatic on Vercel/Render)
- [ ] Configure custom domain
- [ ] Setup SSL certificate (auto on Vercel/Render)
- [ ] Add rate limiting if needed
- [ ] Configure backups for MongoDB
- [ ] Monitor error logs
- [ ] Setup email notifications for errors

## Database Backup

### MongoDB Atlas
1. Go to MongoDB Atlas dashboard
2. Select your cluster
3. Click "Backup" tab
4. Configure automatic backups
5. Create manual backups before major changes

## Scaling Tips

- **Frontend**: Vercel automatically scales
- **Backend**: Upgrade Render plan as needed
- **Database**: MongoDB Atlas handles scaling
- **Add CDN**: Optional, but recommended for images

## Monitoring

### Vercel
- Dashboard shows deployment status
- Automatic error tracking
- Performance analytics

### Render
- Logs tab shows server output
- Metrics tab shows resource usage
- Email alerts available

### MongoDB Atlas
- Atlas dashboard shows connection metrics
- Query performance analyzer
- Storage monitoring

## Support

For issues:
1. Check the main README.md
2. Review backend README.md
3. Check deployment logs
4. Verify all environment variables are set
