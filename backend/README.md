# SK Jewellers Backend API

## Overview
This is the Express.js backend API for SK Jewellers e-commerce platform. It provides REST APIs for products, categories, collections, orders, admin management, and more.

## Tech Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Security**: Helmet, CORS, Rate Limiting

## Project Structure
```
backend/
├── config/          # Configuration files (database connection)
├── controllers/     # Business logic controllers
├── middleware/      # Express middleware (auth, error handling)
├── models/          # MongoDB schemas
├── routes/          # API routes
├── scripts/         # Setup and utility scripts
├── server.js        # Main server file
├── package.json     # Dependencies
└── .env.example     # Environment variables template
```

## Installation

### Prerequisites
- Node.js 16+ installed
- MongoDB database (local or MongoDB Atlas)

### Steps
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file from `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Update `.env` with your MongoDB URI and JWT secrets:
   ```env
   PORT=5000
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/sk_jewellers
   NODE_ENV=development
   JWT_SECRET=your_jwt_secret_key_here
   JWT_REFRESH_SECRET=your_jwt_refresh_secret_key_here
   FRONTEND_URL=http://localhost:3000
   ```

5. Setup admin user:
   ```bash
   node scripts/setupAdmin.js
   ```

6. Start the server:
   ```bash
   npm start
   ```
   Or for development with auto-reload:
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - Logout

### Products
- `GET /api/products` - Get all products (public)
- `GET /api/products/featured` - Get featured products (public)
- `GET /api/products/:id` - Get product by ID (public)
- `GET /api/products/category/:categoryId` - Get products by category (public)
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Categories
- `GET /api/categories` - Get all categories (public)
- `GET /api/categories/:id` - Get category by ID (public)
- `POST /api/categories` - Create category (admin)
- `PUT /api/categories/:id` - Update category (admin)
- `DELETE /api/categories/:id` - Delete category (admin)

### Collections
- `GET /api/collections` - Get all collections (public)
- `GET /api/collections/:id` - Get collection by ID (public)
- `POST /api/collections` - Create collection (admin)
- `PUT /api/collections/:id` - Update collection (admin)
- `DELETE /api/collections/:id` - Delete collection (admin)

### Banners
- `GET /api/banners?position=homepage-top` - Get banners by position (public)
- `POST /api/banners` - Create banner (admin)
- `PUT /api/banners/:id` - Update banner (admin)
- `DELETE /api/banners/:id` - Delete banner (admin)

### Gallery
- `GET /api/gallery` - Get gallery items (public)
- `POST /api/gallery` - Create gallery item (admin)
- `PUT /api/gallery/:id` - Update gallery item (admin)
- `DELETE /api/gallery/:id` - Delete gallery item (admin)

### Reviews
- `GET /api/reviews/product/:productId` - Get product reviews (public)
- `POST /api/reviews` - Submit review (public)
- `PUT /api/reviews/:id` - Approve/update review (admin)
- `DELETE /api/reviews/:id` - Delete review (admin)

### Contact
- `POST /api/contact` - Submit contact form (public)
- `GET /api/contact` - Get contact messages (admin)
- `PUT /api/contact/:id` - Update contact message (admin)
- `DELETE /api/contact/:id` - Delete contact message (admin)

### Newsletter
- `POST /api/newsletter/subscribe` - Subscribe to newsletter (public)
- `POST /api/newsletter/unsubscribe` - Unsubscribe from newsletter (public)
- `GET /api/newsletter` - Get all subscribers (admin)

### Orders
- `POST /api/orders` - Create order (public)
- `GET /api/orders/:orderNumber` - Get order by number (public)
- `GET /api/orders` - Get all orders with pagination (admin)
- `PUT /api/orders/:id` - Update order status (admin)

### Admin Dashboard
- `GET /api/admin/dashboard/stats` - Dashboard statistics (admin)
- `GET /api/admin/dashboard/orders` - Recent orders (admin)
- `GET /api/admin/dashboard/contacts` - Recent contacts (admin)
- `GET /api/admin/dashboard/reviews` - Pending reviews (admin)

## Authentication Flow

1. Admin sends credentials to `/api/auth/login`
2. Server validates credentials and returns JWT access token
3. Refresh token is stored in httpOnly cookie
4. Frontend sends access token in Authorization header: `Authorization: Bearer <token>`
5. Protected routes verify token with `protect` middleware
6. Admin-only routes check role with `adminOnly` middleware

## Error Handling

All endpoints return consistent JSON response format:
```json
{
  "success": false,
  "message": "Error message here"
}
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| PORT | Server port (default: 5000) |
| MONGODB_URI | MongoDB connection string |
| NODE_ENV | Environment (development/production) |
| JWT_SECRET | Secret for access tokens |
| JWT_REFRESH_SECRET | Secret for refresh tokens |
| FRONTEND_URL | Frontend origin for CORS |

## Security Features

- **HTTPS**: Enforced in production via Helmet
- **CORS**: Configured for specific origins
- **Password Hashing**: bcryptjs with 10 salt rounds
- **JWT**: Secure token-based authentication
- **Rate Limiting**: Available for API endpoints
- **MongoDB Injection**: Protected via Mongoose validation
- **XSS**: Helmet headers prevent XSS attacks

## Database Schema

### Product
- name, description, price, discount
- purity (22K, 18K, 14K, etc.)
- weight, material, gemstone, stoneDetails
- category, collection references
- stock, rating, featured status
- images array, SKU, metadata

### Admin
- username, email, password (hashed)
- role (admin, superadmin)
- permissions, isActive status
- lastLogin timestamp

### Order
- orderNumber (unique), customer details
- items array (product, quantity, price)
- shippingAddress
- subtotal, tax, shippingCost, total
- paymentStatus, orderStatus

### Other Models
- Category, Collection, Banner, Gallery
- Review, Contact, Newsletter

## Deployment

### To Render.com
1. Create new Web Service on Render
2. Connect your GitHub repository
3. Set environment variables in Render dashboard
4. Deploy the backend directory
5. Update FRONTEND_URL in environment variables

### MongoDB Atlas Setup
1. Create cluster on MongoDB Atlas
2. Generate connection string
3. Set MONGODB_URI in environment variables
4. Whitelist Render IP in MongoDB Atlas

## Development Tips

- Use `npm run dev` for development with nodemon
- Check MongoDB connection in browser console: `/api/health`
- Use Postman or similar tool to test API endpoints
- Keep JWT secrets secure and rotate regularly
- Validate all user inputs server-side

## Support

For issues or questions, please refer to the main project documentation or contact the development team.
