# SK Jewellers - Quick Start Guide

## 5-Minute Setup for Local Development

### Prerequisites
- Node.js 16+ installed
- MongoDB Atlas account (free tier available)
- Git

### Step 1: Clone & Install
```bash
# Navigate to project directory
cd sk-jewellers

# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

### Step 2: Setup MongoDB
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user (e.g., username: `jeweller`, password: `secure123`)
4. Copy your connection string: `mongodb+srv://jeweller:secure123@cluster.mongodb.net/sk_jewellers`

### Step 3: Configure Backend
```bash
cd backend
cp .env.example .env
```

Edit `backend/.env`:
```env
PORT=5000
MONGODB_URI=mongodb+srv://jeweller:secure123@cluster.mongodb.net/sk_jewellers
NODE_ENV=development
JWT_SECRET=my-super-secret-jwt-key-change-in-production
JWT_REFRESH_SECRET=my-super-secret-refresh-key-change-in-production
FRONTEND_URL=http://localhost:3000
```

### Step 4: Initialize Admin User
```bash
cd backend
node scripts/setupAdmin.js
```

You'll see:
```
Admin user created successfully
Username: admin
Password: admin123
```

### Step 5: Configure Frontend
```bash
# From project root
cp .env.example .env.local
```

Edit `.env.local`:
```env
VITE_API_URL=http://localhost:5000/api
```

### Step 6: Start Development Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
# Backend running at http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
# From project root
npm run dev
# Frontend running at http://localhost:3000
```

### Step 7: Test Everything
1. Open http://localhost:3000 in your browser
2. Click on admin/login area
3. Use credentials:
   - **Username**: admin
   - **Password**: admin123
4. You should see the admin dashboard!

## Common Tasks

### Add a Product (Admin)
1. Log in to admin panel
2. Navigate to Products
3. Fill in product details:
   - Name, description, price
   - Purity (22K, 18K, etc.)
   - Weight, material, gemstone
   - Upload images
4. Click Save

### View Products (Public)
1. Browse the products page
2. Filter by category
3. Search for specific items
4. Sort by price or newest

### Contact Form
1. Go to Contact page
2. Fill in your details
3. Submit message
4. Admin receives it in dashboard

### Newsletter Signup
1. Enter email at newsletter section
2. Click Subscribe
3. Confirm subscription

## Troubleshooting

### "Cannot connect to MongoDB"
- Check MONGODB_URI in `.env` is correct
- Verify IP is whitelisted in MongoDB Atlas
- Ensure database user has correct password

### "Admin login fails"
- Verify backend is running: `curl http://localhost:5000/api/health`
- Check admin user exists: Run `node scripts/setupAdmin.js` again
- Check `JWT_SECRET` is set in `.env`

### "Frontend can't reach backend"
- Verify `VITE_API_URL` in `.env.local` is correct
- Check backend is running on port 5000
- Verify CORS: Check backend logs for errors

### Port already in use
```bash
# Kill process on port 5000 (backend)
lsof -i :5000
kill -9 <PID>

# Kill process on port 5173 (frontend)
lsof -i :5173
kill -9 <PID>
```

## API Testing

### Test with curl
```bash
# Health check
curl http://localhost:5000/api/health

# Get products
curl http://localhost:5000/api/products

# Admin login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'

# Get with auth token
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:5000/api/products
```

## Useful Frontend URLs
- Home: http://localhost:3000
- Admin Login: http://localhost:3000/admin
- Products: http://localhost:3000/products
- Contact: http://localhost:3000/contact

## Next Steps

### After Local Development Works:
1. **Test all features** - Try adding products, placing orders, submitting contact forms
2. **Customize styling** - Update colors and fonts to match your brand
3. **Add more products** - Populate with actual product data
4. **Test admin dashboard** - Verify all stats and features work
5. **Deploy** - Follow `DEPLOYMENT.md` for production

### To Deploy:
```bash
# See DEPLOYMENT.md for:
# 1. Push code to GitHub
# 2. Deploy backend on Render
# 3. Deploy frontend on Vercel
# 4. Configure database
# 5. Setup custom domain
```

## Important Notes

- **Change admin password** after first login
- **Store JWT secrets securely** - Use strong random strings
- **Enable MongoDB backups** before going live
- **Test thoroughly** before sharing with users
- **Monitor logs** after deployment

## Getting Help

1. Check the comprehensive docs:
   - `IMPLEMENTATION_SUMMARY.md` - What was built
   - `backend/README.md` - API documentation
   - `DEPLOYMENT.md` - Deployment guide

2. Check error logs:
   - Backend: Terminal where `npm run dev` runs
   - Frontend: Browser console (F12)
   - MongoDB: Atlas dashboard

3. Common issues: See "Troubleshooting" section above

## Performance Tips

- **Database**: Add indexes for frequently searched fields
- **Images**: Optimize images before uploading
- **Cache**: Use browser cache for static assets
- **API**: Implement pagination for large datasets
- **Frontend**: Use lazy loading for images and routes

Enjoy building with SK Jewellers! 🚀
