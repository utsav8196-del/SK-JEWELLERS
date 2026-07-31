# SK Jewellers - Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         DEPLOYMENT LAYER                        │
│  ┌──────────────────┐  ┌──────────────────┐  ┌───────────────┐  │
│  │   Vercel CDN     │  │   Render Server  │  │ MongoDB Atlas │  │
│  │  (Frontend)      │  │   (Backend)      │  │  (Database)   │  │
│  └──────────────────┘  └──────────────────┘  └───────────────┘  │
└─────────────────────────────────────────────────────────────────┘
         ↓                    ↓                        ↑
┌─────────────────────────────────────────────────────────────────┐
│                      APPLICATION LAYER                          │
│                                                                  │
│  ┌──────────────────────────────┐  ┌─────────────────────────┐  │
│  │      FRONTEND (React)        │  │   BACKEND (Express)     │  │
│  │                              │  │                         │  │
│  │  ┌──────────────────────┐    │  │  ┌─────────────────┐    │  │
│  │  │   Components         │    │  │  │  Routes         │    │  │
│  │  │  - Pages             │    │  │  │  - /api/auth    │    │  │
│  │  │  - UI Sections       │    │  │  │  - /api/products│    │  │
│  │  │  - Admin Dashboard   │    │  │  │  - /api/orders  │    │  │
│  │  └──────────────────────┘    │  │  │  - /api/admin   │    │  │
│  │                              │  │  └─────────────────┘    │  │
│  │  ┌──────────────────────┐    │  │                         │  │
│  │  │  Services (Axios)    │    │  │  ┌─────────────────┐    │  │
│  │  │  - authService       │◄──┼──┼──│  Controllers    │    │  │
│  │  │  - productsService   │   │  │  │  - authController   │    │  │
│  │  │  - ordersService     │   │  │  │  - productController│    │  │
│  │  │  - contactService    │   │  │  └─────────────────┘    │  │
│  │  │  - etc.              │   │  │                         │  │
│  │  └──────────────────────┘    │  │  ┌─────────────────┐    │  │
│  │                              │  │  │  Middleware     │    │  │
│  │  ┌──────────────────────┐    │  │  │  - auth.js      │    │  │
│  │  │  HTTP Client         │    │  │  │  - errorHandler │    │  │
│  │  │  - Axios Instance    │    │  │  │  - CORS, Helmet │    │  │
│  │  │  - Token Management  │    │  │  └─────────────────┘    │  │
│  │  │  - Request/Response  │    │  │                         │  │
│  │  │    Interceptors      │    │  │  ┌─────────────────┐    │  │
│  │  └──────────────────────┘    │  │  │  Models         │    │  │
│  └──────────────────────────────┘  │  │  - Product      │    │  │
│                                     │  │  - Order        │    │  │
│                                     │  │  - Admin        │    │  │
│                                     │  │  - Category     │    │  │
│                                     │  │  - etc.         │    │  │
│                                     │  └─────────────────┘    │  │
│                                     └─────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                      DATA LAYER (MongoDB)                        │
│                                                                  │
│  Collections:                                                    │
│  - products (indexed: category, featured, text search)          │
│  - categories (indexed: slug)                                   │
│  - collections (indexed: slug)                                  │
│  - orders (indexed: orderNumber, customerEmail)                 │
│  - admins (indexed: username, email)                            │
│  - reviews (indexed: product, isApproved)                       │
│  - contacts (indexed: email, status)                            │
│  - banners (indexed: position, isActive)                        │
│  - gallery (indexed: isActive)                                  │
│  - newsletters (indexed: email, isSubscribed)                   │
└─────────────────────────────────────────────────────────────────┘
```

## Authentication Flow

```
┌─────────────────────────────────────────────────────────────────┐
│ 1. USER LOGIN                                                   │
│    ┌─────────────────┐                                         │
│    │ Admin enters    │                                         │
│    │ username &      │                                         │
│    │ password        │                                         │
│    └────────┬────────┘                                         │
│             │                                                   │
│             ▼                                                   │
│    ┌─────────────────────────┐                                │
│    │ Frontend: authService   │                                │
│    │ .login()                │                                │
│    └────────┬────────────────┘                                │
│             │                                                   │
│             │ POST /api/auth/login                            │
│             ▼                                                   │
│    ┌─────────────────────────┐                                │
│    │ Backend: Verify         │                                │
│    │ credentials             │                                │
│    │ Generate JWT tokens     │                                │
│    └────────┬────────────────┘                                │
│             │                                                   │
│             │ Response: {accessToken, refreshToken}           │
│             ▼                                                   │
│    ┌─────────────────────────┐                                │
│    │ Frontend: Store token   │                                │
│    │ localStorage            │                                │
│    │ Cookie (refresh)        │                                │
│    └────────┬────────────────┘                                │
│             │                                                   │
│ 2. AUTHENTICATED REQUEST                                        │
│             │                                                   │
│             ▼                                                   │
│    ┌─────────────────────────┐                                │
│    │ Frontend: API call      │                                │
│    │ Axios interceptor       │                                │
│    │ adds token to header    │                                │
│    └────────┬────────────────┘                                │
│             │                                                   │
│             │ GET /api/products                               │
│             │ Authorization: Bearer <token>                   │
│             ▼                                                   │
│    ┌─────────────────────────┐                                │
│    │ Backend: Verify token   │                                │
│    │ Middleware: protect()   │                                │
│    │ Check role: adminOnly() │                                │
│    └────────┬────────────────┘                                │
│             │                                                   │
│             ├──► TOKEN VALID ──► Process request             │
│             │                    Return data                  │
│             │                                                   │
│             └──► TOKEN EXPIRED ──► Request refresh           │
│                  (401 error)       Frontend refreshes         │
│                                    Retries request            │
│                                                               │
└─────────────────────────────────────────────────────────────────┘
```

## Data Flow - Product Listing

```
User visits products page
         │
         ▼
   ┌─────────────┐
   │ Render      │
   │ Products    │
   │ component   │
   └──────┬──────┘
          │
          │ useEffect hook
          ▼
   ┌──────────────────────┐
   │ productsService      │
   │ .getAll(params)      │
   └──────┬───────────────┘
          │
          │ Calls Axios instance
          │ GET /api/products
          │ ?page=1&limit=12&sort=newest
          ▼
   ┌──────────────────────┐
   │ Axios interceptor    │
   │ Attaches auth token  │
   │ if admin             │
   └──────┬───────────────┘
          │
          │ HTTP Request
          ▼
   ┌──────────────────────┐
   │ Backend              │
   │ GET /api/products    │
   └──────┬───────────────┘
          │
          │ products.js router
          ▼
   ┌──────────────────────┐
   │ productController    │
   │ getAllProducts()     │
   └──────┬───────────────┘
          │
          │ Build query with filters
          │ Search, category, status
          ▼
   ┌──────────────────────┐
   │ Product.find()       │
   │ .populate('category')│
   │ .sort()              │
   │ .skip() .limit()     │
   └──────┬───────────────┘
          │
          │ Database query
          ▼
   ┌──────────────────────┐
   │ MongoDB Atlas        │
   │ Returns products     │
   └──────┬───────────────┘
          │
          │ Response: 200 OK
          │ {products, total, pages}
          ▼
   ┌──────────────────────┐
   │ Frontend receives    │
   │ response            │
   │ Update state        │
   └──────┬───────────────┘
          │
          │ Component re-renders
          ▼
   ┌──────────────────────┐
   │ User sees products   │
   │ on page              │
   └──────────────────────┘
```

## Directory Structure - Detailed

```
sk-jewellers/
│
├── backend/                          ← Express.js Server
│   ├── config/
│   │   └── database.js              # MongoDB connection setup
│   │
│   ├── middleware/
│   │   ├── auth.js                  # JWT verification, role checking
│   │   └── errorHandler.js          # Error handling and AppError class
│   │
│   ├── models/                       # MongoDB Schemas
│   │   ├── Product.js               # Product with 30+ fields
│   │   ├── Category.js              # Categories with slug
│   │   ├── Collection.js            # Collections
│   │   ├── Admin.js                 # Admin users with bcrypt
│   │   ├── Order.js                 # Orders with items array
│   │   ├── Review.js                # Product reviews
│   │   ├── Contact.js               # Contact form submissions
│   │   ├── Banner.js                # Marketing banners
│   │   ├── Gallery.js               # Gallery images
│   │   └── Newsletter.js            # Newsletter subscriptions
│   │
│   ├── controllers/
│   │   ├── authController.js        # Login, refresh, logout
│   │   └── productController.js     # Get, create, update, delete products
│   │
│   ├── routes/                       # API Endpoints
│   │   ├── auth.js                  # /api/auth/* routes
│   │   ├── products.js              # /api/products/* routes
│   │   ├── categories.js            # /api/categories/* routes
│   │   ├── collections.js           # /api/collections/* routes
│   │   ├── banners.js               # /api/banners/* routes
│   │   ├── gallery.js               # /api/gallery/* routes
│   │   ├── reviews.js               # /api/reviews/* routes
│   │   ├── contact.js               # /api/contact/* routes
│   │   ├── newsletter.js            # /api/newsletter/* routes
│   │   ├── orders.js                # /api/orders/* routes
│   │   └── admin.js                 # /api/admin/* routes
│   │
│   ├── scripts/
│   │   └── setupAdmin.js            # Initialize admin user
│   │
│   ├── server.js                    # Express app and middleware setup
│   ├── package.json                 # Dependencies
│   ├── .env.example                 # Environment template
│   └── README.md                    # API documentation
│
├── src/                             ← React Frontend
│   ├── services/                    # API Integration Layer
│   │   ├── api.js                   # Axios client with interceptors
│   │   ├── authService.js           # Authentication operations
│   │   ├── productsService.js       # Product operations
│   │   ├── categoriesService.js     # Category operations
│   │   ├── collectionsService.js    # Collection operations
│   │   ├── ordersService.js         # Order operations
│   │   ├── bannersService.js        # Banner operations
│   │   ├── galleryService.js        # Gallery operations
│   │   ├── reviewsService.js        # Review operations
│   │   ├── contactService.js        # Contact operations
│   │   ├── newsletterService.js     # Newsletter operations
│   │   └── adminService.js          # Admin dashboard operations
│   │
│   ├── pages/
│   │   ├── Auth.jsx                 # Login page (updated with API)
│   │   ├── AdminDashboard.jsx       # Admin panel
│   │   └── ... (other pages)
│   │
│   ├── components/
│   │   └── ... (existing components)
│   │
│   └── ... (styles, utils, hooks)
│
├── .env.example                     # Frontend env template
├── QUICKSTART.md                    # Quick setup guide
├── IMPLEMENTATION_SUMMARY.md        # What was built
├── DEPLOYMENT.md                    # How to deploy
├── ARCHITECTURE.md                  # This file
├── package.json                     # Frontend dependencies
└── vite.config.js                   # Build configuration
```

## API Endpoints Summary

### Public Routes (No Auth Required)
```
GET    /api/products              Get all products (paginated)
GET    /api/products/featured     Get featured products
GET    /api/products/:id          Get single product
GET    /api/products/category/:id Get products by category
GET    /api/categories            Get all categories
GET    /api/collections           Get all collections
GET    /api/banners               Get banners by position
GET    /api/gallery               Get gallery items
GET    /api/reviews/product/:id   Get product reviews
POST   /api/reviews               Submit review
POST   /api/contact               Submit contact form
POST   /api/newsletter/subscribe  Subscribe to newsletter
POST   /api/newsletter/unsubscribe Unsubscribe
POST   /api/orders                Create order
GET    /api/orders/:orderNumber   Track order
POST   /api/auth/login            Admin login
```

### Admin Routes (Requires JWT Token)
```
PUT    /api/products/:id          Update product
DELETE /api/products/:id          Delete product
POST   /api/categories            Create category
PUT    /api/categories/:id        Update category
DELETE /api/categories/:id        Delete category
POST   /api/collections           Create collection
PUT    /api/collections/:id       Update collection
DELETE /api/collections/:id       Delete collection
POST   /api/banners               Create banner
PUT    /api/banners/:id           Update banner
DELETE /api/banners/:id           Delete banner
POST   /api/gallery               Add gallery item
PUT    /api/gallery/:id           Update gallery item
DELETE /api/gallery/:id           Delete gallery item
PUT    /api/reviews/:id           Approve/update review
DELETE /api/reviews/:id           Delete review
GET    /api/contact               Get all contact messages
PUT    /api/contact/:id           Update contact message
DELETE /api/contact/:id           Delete contact message
GET    /api/newsletter            Get all subscribers
PUT    /api/orders/:id            Update order status
GET    /api/admin/dashboard/stats Get dashboard statistics
GET    /api/admin/dashboard/orders Get recent orders
GET    /api/admin/dashboard/contacts Get recent contacts
GET    /api/admin/dashboard/reviews Get pending reviews
```

## Security Layers

```
FRONTEND
├── Axios Interceptors
│   ├── Add JWT token to requests
│   └── Handle 401 with token refresh
│
├── localStorage
│   └── Secure token storage (consider moving to cookie)
│
└── Session Management
    └── Auto-redirect to login on auth failure

BACKEND
├── CORS Middleware
│   └── Only allow requests from FRONTEND_URL
│
├── Helmet
│   ├── Remove X-Powered-By
│   ├── Set security headers
│   └── Prevent XSS attacks
│
├── Authentication Middleware
│   ├── Verify JWT signature
│   └── Check token expiration
│
├── Authorization Middleware
│   ├── Verify admin role
│   └── Check permissions
│
├── Input Validation
│   ├── Mongoose schema validation
│   └── Type checking
│
├── Password Security
│   ├── bcryptjs hashing
│   ├── 10 salt rounds
│   └── Never log passwords
│
└── Error Handling
    ├── Generic error messages
    ├── Don't expose stack traces
    └── Log errors securely

DATABASE
├── MongoDB Validation
│   ├── Schema-level validation
│   └── Type enforcement
│
├── Indexes
│   ├── Performance optimization
│   └── Query acceleration
│
└── Access Control
    ├── Database user with limited permissions
    └── IP whitelist
```

## Deployment Architecture

```
Local Development
├── Frontend (Vite dev server :3000)
├── Backend (Node.js :5000)
└── MongoDB (Local or Atlas)

Production
├── Frontend
│   ├── Vercel CDN
│   ├── Automatic HTTPS
│   ├── Automatic deployments from GitHub
│   └── Environment: VITE_API_URL=https://backend.onrender.com/api
│
├── Backend
│   ├── Render.com
│   ├── Node.js server
│   ├── Environment variables
│   └── Automatic deployments from GitHub
│
└── Database
    ├── MongoDB Atlas (Cloud)
    ├── Automatic backups
    ├── Replica sets for redundancy
    └── Connection pooling
```

## Performance Considerations

### Frontend Optimizations
- **Code Splitting**: Lazy load routes and components
- **Image Optimization**: Compress images before upload
- **Caching**: Browser cache for static assets
- **API Caching**: Axios can cache GET requests
- **Token Refresh**: Transparent, no user interruption

### Backend Optimizations
- **Database Indexing**: Indexes on commonly searched fields
- **Pagination**: Limit results (default 12 per page)
- **Query Optimization**: Select only needed fields
- **Response Compression**: Gzip enabled by Helmet
- **Connection Pooling**: MongoDB connection reuse

### Database Optimization
- **Compound Indexes**: Category + Status + CreatedAt
- **Text Indexes**: For search functionality
- **TTL Indexes**: Auto-delete expired sessions
- **Capped Collections**: Limited size collections for logs

## Scalability Path

**Phase 1** (Current)
- Vercel frontend
- Render backend (free tier)
- MongoDB Atlas (free tier)

**Phase 2** (Growth)
- Vercel frontend (auto-scales)
- Render (scale up compute)
- MongoDB (upgrade cluster)

**Phase 3** (High Traffic)
- Vercel frontend (unlimited scaling)
- Render (multiple instances/load balancing)
- MongoDB (sharding)
- Redis cache layer
- CDN for images

## Technology Rationale

| Component | Choice | Why |
|-----------|--------|-----|
| Frontend | React + Vite | Fast, modern, good ecosystem |
| Backend | Express.js | Simple, flexible, easy to learn |
| Database | MongoDB | NoSQL, flexible schema, Atlas cloud |
| Auth | JWT | Stateless, scalable, standard |
| Hashing | bcryptjs | Industry standard, proven secure |
| Frontend Deploy | Vercel | Optimized for Next.js/React, free tier |
| Backend Deploy | Render | Simple deployment, good free tier |
| API Client | Axios | Better error handling, interceptors |

## Next Steps for Enhancement

1. **Caching**: Add Redis for session/product caching
2. **Search**: Implement Elasticsearch for better search
3. **CDN**: Use Cloudflare for static asset distribution
4. **Monitoring**: Add Sentry for error tracking
5. **Analytics**: Add Mixpanel or similar
6. **Email**: Add SendGrid for transactional emails
7. **Payments**: Integrate Stripe for checkout
8. **Admin**: Build comprehensive admin UI for management
9. **Testing**: Add Jest + React Testing Library
10. **CI/CD**: GitHub Actions for automated testing
