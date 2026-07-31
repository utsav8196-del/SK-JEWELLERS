# Admin Authentication - Quick Start (30 seconds)

## Access Admin Panel in 3 Clicks

### Desktop
1. Click **login icon** (🔑) in top-right navbar
2. Click **"Admin Login"**
3. Enter credentials and click **"Sign In"**

### Mobile
1. Click **hamburger menu** (☰)
2. Scroll to **Admin** section
3. Tap **"Admin Login"**

## Login Instantly

```
URL: http://localhost:5000/admin/login
Username: admin
Password: admin123
```

Click "Sign In" → Done! ✓

## Create New Admin Account

1. Click login icon → **"Admin Register"**
2. Fill in:
   - Username: (choose your username)
   - Email: (your email)
   - Password: (6+ characters)
   - Confirm Password: (same as above)
3. Click **"Register"**
4. Auto-logged in to dashboard ✓

## Navbar Admin Menu

**When NOT Logged In:**
- Admin Login
- Admin Register

**When Logged In:**
- Your Username
- Admin Dashboard (link)

Visual Indicator: 
- ⚪ Plain icon = Not logged in
- 🟡 Gold icon + 🟢 Green dot = Logged in

## Dashboard Features

Once logged in, you'll see:
- **Sidebar** with menu items (Orders, Products, etc.)
- **Stats Cards** showing key metrics
- **Recent Orders** table
- **User Info** at sidebar bottom
- **Logout Button** in sidebar footer

## Logout

Bottom of sidebar:
```
Logged in as: admin
admin@email.com
[LOGOUT]
```

Click LOGOUT to sign out and clear session.

## Routes

| Page | URL | Access |
|------|-----|--------|
| Admin Login | `/admin/login` | Anyone |
| Admin Register | `/admin/register` | Anyone |
| Admin Dashboard | `/admin` | Logged-in only |

## Features

✓ Username/password login
✓ New account registration  
✓ Protected dashboard
✓ Session persistence (localStorage)
✓ Mobile & desktop support
✓ Dark mode compatible
✓ Auto-logout button
✓ Integrated in navbar

## Technical Details

**Backend**: Express.js + MongoDB
**Frontend**: React + Context API
**Authentication**: JWT tokens
**Storage**: localStorage for session
**Port**: Frontend 5174, Backend 5000

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Can't login | Try demo: admin/admin123 |
| Redirected to login | Not authenticated, login first |
| Can't find admin link | Check navbar top-right (desktop) or hamburger (mobile) |
| Session lost | Refresh page to restore from localStorage |
| Forgot password | Contact admin for reset |

## Files Overview

```
src/context/AdminAuthContext.jsx     ← Auth state management
src/pages/AdminLogin.jsx             ← Login page
src/pages/AdminRegister.jsx          ← Register page
src/pages/AdminDashboard.jsx         ← Protected dashboard
src/components/layout/Navbar.jsx     ← Admin menu in navbar
src/services/authService.js          ← API calls
```

## API Endpoints Used

```
POST /api/auth/login
POST /api/auth/register
POST /api/auth/logout
```

## Key Hook

```javascript
import { useAdminAuth } from '../context/AdminAuthContext';

const { admin, isAuthenticated, login, register, logout } = useAdminAuth();
```

## Browser Local Storage

Your session uses:
- `adminToken` - JWT token
- `adminData` - Admin user info (JSON)

Cleared automatically on logout.

## Next Steps

1. **Test Login**: Try demo credentials (admin/admin123)
2. **Create Account**: Register with your details
3. **Explore Dashboard**: Check out the admin panel
4. **Manage Products**: Upload and manage your inventory
5. **Track Orders**: Monitor customer orders

## Demo Credentials

```
🔑 Demo Admin Account
Username: admin
Password: admin123
```

Use for testing the complete admin workflow.

## Security

- ✓ Passwords hashed with bcrypt
- ✓ Tokens expire after 1 day
- ✓ HTTP-only cookies (backend)
- ✓ CORS protected
- ✓ Input validation
- ✓ Session management

## Mobile-Friendly

✓ Responsive navbar menu
✓ Touch-friendly buttons
✓ Mobile dashboard
✓ All features work on phones

## Dark Mode Support

✓ Light theme (default)
✓ Dark theme (click sun/moon icon)
✓ Theme saved automatically

---

**Need help?** See `USER_GUIDE.md` for detailed instructions  
**Technical details?** See `ADMIN_AUTH_GUIDE.md` for full documentation
