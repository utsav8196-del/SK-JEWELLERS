# Admin Authentication System Guide

## Overview

SK Jewellers now has a comprehensive admin authentication system integrated directly into the user interface. Admins can login and register through dedicated pages accessible from the navbar.

## Features

### 1. Admin Context (`AdminAuthContext.jsx`)
- Centralized state management for admin authentication
- Persistent login using localStorage
- Automatic session restoration on page reload
- Login, register, and logout methods

### 2. Admin Login Page (`/admin/login`)
- Username and password authentication
- Error handling and validation
- Demo credentials display
- Link to registration page
- Beautiful, responsive design matching SK Jewellers branding

### 3. Admin Register Page (`/admin/register`)
- Create new admin accounts
- Form validation:
  - Password confirmation
  - Minimum password length (6 characters)
  - Email validation
- Link to login page
- Terms of Service notice

### 4. Protected Admin Dashboard
- Auto-redirect to login if not authenticated
- Displays logged-in admin username and email
- Logout button in sidebar
- Session persistence

### 5. Enhanced Navbar
- Admin login/register links in desktop dropdown menu
- Mobile-friendly admin menu
- Green indicator dot when logged in
- Quick access to admin dashboard when authenticated

## User Flow

### First Time Admin Access

1. **From Navbar**: Click the login icon (LogIn) in top-right corner
   - Desktop: Opens dropdown with "Admin Login" / "Admin Register" links
   - Mobile: Visible in mobile menu under admin section

2. **Login Path**:
   - Visit `/admin/login`
   - Enter username and password
   - Click "Sign In"
   - Redirected to `/admin` dashboard on success

3. **Register Path**:
   - Visit `/admin/register`
   - Fill in username, email, password, confirm password
   - Click "Register"
   - Account created and logged in automatically
   - Redirected to `/admin` dashboard

### Demo Access

**Demo Credentials** (pre-configured in backend):
- Username: `admin`
- Password: `admin123`

## Technical Implementation

### Files Modified/Created

```
src/
├── context/
│   └── AdminAuthContext.jsx          (NEW - Auth state management)
├── pages/
│   ├── AdminLogin.jsx                (NEW - Login page)
│   ├── AdminRegister.jsx             (NEW - Register page)
│   ├── AdminDashboard.jsx            (MODIFIED - Added auth protection)
│   └── Auth.jsx                      (KEPT - For user auth, if needed)
├── services/
│   └── authService.js                (MODIFIED - Added register method)
├── components/
│   └── layout/
│       └── Navbar.jsx                (MODIFIED - Added admin menu)
└── App.jsx                           (MODIFIED - Added routes & provider)
```

### Authentication Flow

```
User Action
    ↓
AdminLogin/AdminRegister Component
    ↓
authService.login() / authService.register()
    ↓
Backend API (/auth/login or /auth/register)
    ↓
JWT Token + Admin Data Returned
    ↓
localStorage.setItem('adminToken', token)
localStorage.setItem('adminData', admin)
    ↓
AdminAuthContext State Updated
    ↓
useAdminAuth() Hook Provides State to Components
    ↓
Navbar & AdminDashboard Re-render with Auth Status
```

### Key Hooks & Functions

#### `useAdminAuth()` Hook

```javascript
import { useAdminAuth } from '../context/AdminAuthContext';

// In your component:
const { admin, isAuthenticated, loading, login, register, logout } = useAdminAuth();

// Use it:
if (isAuthenticated) {
  // Show admin content
}
```

#### Available Methods

```javascript
// Login
await login(username, password);

// Register
await register(username, email, password);

// Logout
logout();

// Check auth status
isAuthenticated  // true/false
admin            // { username, email, ... } or null
loading          // true while initializing
```

## Styling

All components follow SK Jewellers design system:
- **Primary Color**: `#C8A951` (Gold)
- **Background**: `#FAF8F5` (Light) / `#111` (Dark)
- **Text**: Serif fonts for headings, sans-serif for body
- **Borders**: `var(--border)` for consistency
- **Animations**: Framer Motion for smooth transitions

## Security Features

### Implemented

1. **JWT Tokens**: Secure token-based authentication
2. **HTTP-Only Cookies** (Backend): Cannot be accessed via JavaScript
3. **Password Hashing** (Backend): bcrypt with salting
4. **Token Refresh** (Backend): Access + Refresh tokens
5. **Input Validation** (Frontend & Backend):
   - Email format validation
   - Password length requirements
   - Username requirements

### Backend Security

The backend handles:
- Password hashing with bcrypt
- JWT token generation and validation
- Token refresh mechanism
- Rate limiting on auth endpoints
- CORS protection
- Input sanitization

## Environment Setup

### Frontend `.env.local`

```env
VITE_API_URL=http://localhost:5000/api
```

### Backend `.env`

```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/sk-jewellers
JWT_SECRET=your-secret-key
JWT_REFRESH_SECRET=your-refresh-secret
```

## Testing

### Manual Testing Checklist

- [ ] **Login**: Test with demo credentials (admin/admin123)
- [ ] **Register**: Create new admin account
- [ ] **Dashboard Access**: Verify admin dashboard loads when logged in
- [ ] **Protected Route**: Try accessing `/admin` without login (should redirect to `/admin/login`)
- [ ] **Logout**: Click logout button and verify redirect to login page
- [ ] **Session Persistence**: Refresh page while logged in (should maintain session)
- [ ] **Mobile Menu**: Test admin links on mobile device
- [ ] **Desktop Dropdown**: Test admin dropdown in navbar
- [ ] **Error Handling**: Try invalid credentials
- [ ] **Validation**: Test register form validation
- [ ] **Dark Mode**: Test in both light and dark themes

## API Endpoints

The frontend uses these backend endpoints:

### Login
```
POST /api/auth/login
Body: { username, password }
Response: { success, token, refreshToken, admin, message }
```

### Register
```
POST /api/auth/register
Body: { username, email, password }
Response: { success, token, refreshToken, admin, message }
```

### Logout
```
POST /api/auth/logout
Response: { success, message }
```

## Troubleshooting

### Admin can't login

1. **Check backend is running**:
   ```bash
   cd backend && npm run dev
   ```

2. **Verify MongoDB connection**:
   - Check `.env` file has `MONGODB_URI`
   - Confirm MongoDB is running or connected

3. **Check credentials**:
   - Ensure admin account exists in database
   - Verify username/password are correct
   - Try demo credentials first

### Token expired error

- The access token expires after 1 day
- Refresh token should handle automatic refresh
- If still failing, logout and login again

### CORS errors

- Ensure backend CORS is configured for frontend URL
- Check `VITE_API_URL` matches backend URL

### localStorage issues

- Open browser DevTools (F12)
- Go to Application → Local Storage
- Check for `adminToken` and `adminData`
- Clear if corrupted and logout/login again

## Future Enhancements

Potential improvements:
- [ ] Two-factor authentication (2FA)
- [ ] OAuth integration (Google, GitHub)
- [ ] Admin roles (Admin, SuperAdmin, Moderator)
- [ ] Permission-based access control
- [ ] Admin activity logging
- [ ] Session timeout warning
- [ ] Remember me functionality
- [ ] Forgot password flow
- [ ] Email verification on registration
- [ ] Admin account recovery

## Support

For issues or questions:
1. Check the TESTING.md guide for general troubleshooting
2. Review backend README for API details
3. Check console errors (F12 → Console tab)
4. Verify backend is running and accessible

## Version History

- **v1.0**: Initial admin auth system with login/register
  - AdminAuthContext for state management
  - Protected admin dashboard
  - Navbar integration
  - Full form validation
  - Demo credentials support
