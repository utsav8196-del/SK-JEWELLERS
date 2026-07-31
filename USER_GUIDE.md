# SK Jewellers - User Guide

## Navigation Overview

### Accessing the Admin Panel

The admin panel is fully integrated into the user-facing website. You can access it from any page.

## Desktop Navigation

### Method 1: Top-Right Login Icon
1. Look for the **login icon** (🔑) in the top-right corner of the navbar
2. Click it to open a dropdown menu
3. Choose:
   - **Admin Login** - Sign in with existing credentials
   - **Admin Register** - Create a new admin account

### Method 2: Direct URL
- **Login**: Visit `/admin/login`
- **Register**: Visit `/admin/register`
- **Dashboard**: Visit `/admin` (only if logged in)

## Mobile Navigation

### Using the Mobile Menu
1. Tap the **hamburger menu** (☰) in the top-left corner
2. Scroll down to the **Admin** section
3. Tap **Admin Login** or **Admin Register**

### Mobile Quick Access
- A dedicated admin section appears in the mobile menu
- Shows your login status if already authenticated
- Quick link to dashboard when logged in

## Admin Login Process

### Step-by-Step Guide

1. **Click Admin Login**
   - From navbar dropdown on desktop
   - From mobile menu on phones/tablets
   - Or visit `/admin/login` directly

2. **Login Page Layout**
   ```
   ┌─────────────────────────────────┐
   │      [Admin Login Icon]          │
   ├─────────────────────────────────┤
   │   Admin Login                   │
   │   Access the SK Jewellers       │
   │   admin panel                   │
   ├─────────────────────────────────┤
   │ Username: [____________]        │
   │ Password: [____________]        │
   ├─────────────────────────────────┤
   │   [ SIGN IN ]                   │
   ├─────────────────────────────────┤
   │ Don't have account? Register    │
   ├─────────────────────────────────┤
   │ Demo: admin / admin123          │
   └─────────────────────────────────┘
   ```

3. **Enter Credentials**
   - Username: Your admin username
   - Password: Your admin password

4. **Click "Sign In"**
   - Button shows "Signing In..." while processing
   - You'll be redirected to the admin dashboard on success

5. **Success!**
   - Redirected to `/admin` dashboard
   - Your username appears in sidebar
   - Ready to manage SK Jewellers

## Admin Register Process

### Creating Your Admin Account

1. **Click Admin Register**
   - From navbar dropdown on desktop
   - From mobile menu on phones
   - Or visit `/admin/register` directly

2. **Registration Form**
   ```
   ┌─────────────────────────────────┐
   │    [User Plus Icon]              │
   ├─────────────────────────────────┤
   │ Create Admin Account             │
   │ Register for SK Jewellers       │
   │ admin access                    │
   ├─────────────────────────────────┤
   │ Username:    [____________]      │
   │ Email:       [____________]      │
   │ Password:    [____________]      │
   │ Confirm:     [____________]      │
   ├─────────────────────────────────┤
   │   [ REGISTER ]                  │
   ├─────────────────────────────────┤
   │ Already registered? Sign in     │
   └─────────────────────────────────┘
   ```

3. **Fill Required Fields**
   - **Username**: Choose a unique username
   - **Email**: Valid email address
   - **Password**: Strong password (min 6 chars)
   - **Confirm Password**: Must match password field

4. **Validation Rules**
   - ✓ Password must be at least 6 characters
   - ✓ Email must contain @ symbol
   - ✓ Passwords must match
   - ✓ Username is required

5. **Click "Register"**
   - Account is created immediately
   - You're automatically logged in
   - Redirected to dashboard

## Admin Dashboard Features

### Dashboard Layout

```
┌─────────────────────────────────────────┐
│  SK JEWELLERS           [Nav Icons]      │  ← Navbar
├──────────────────────────────────────────┤
│                                          │
│  [Sidebar]      [Main Content Area]     │
│                                          │
│  • Dashboard     • Dashboard Overview    │
│  • Orders        • Stats Cards           │
│  • Products      • Recent Orders Table   │
│  • Customers                             │
│  • Analytics                             │
│  • Settings                              │
│                                          │
│  [Admin Info]                            │
│  Logged in as: admin                    │
│  admin@email.com                        │
│  [LOGOUT]                               │
│                                          │
└──────────────────────────────────────────┘
```

### Sidebar Options

- **Dashboard** - Overview and statistics
- **Orders** - Manage customer orders
- **Products** - Add/edit products
- **Customers** - Manage customer accounts
- **Analytics** - View business analytics
- **Settings** - System configuration

### Dashboard Stats

View key metrics:
- **Total Revenue** - Overall sales amount
- **Total Orders** - Number of orders
- **Active Customers** - Number of customers
- **Total Products** - Number of products

### Recent Orders

Table showing:
- Order ID
- Customer name
- Order date
- Amount
- Status (Completed, Pending, etc.)

## Logging Out

### Desktop Logout

1. Look at the sidebar (left side of admin panel)
2. Scroll to bottom - you'll see:
   ```
   Logged in as: [your username]
   [your email]
   [LOGOUT]
   ```
3. Click the **[LOGOUT]** button

### Mobile Logout

1. Admin dashboard is accessible on mobile
2. Scroll sidebar to the bottom
3. Tap **[LOGOUT]**
4. Redirected to login page

## Login Status Indicators

### Visual Cues

**Not Logged In:**
- Login icon (🔑) appears plain in navbar
- No green indicator
- Dropdown shows "Admin Login" and "Admin Register" options

**Logged In:**
- Login icon (🔑) turns **gold** in navbar
- Small **green dot** appears on icon
- Dropdown shows your username and "Admin Dashboard" option

## Demo Account Access

### Quick Start with Demo Credentials

For testing purposes, a demo admin account is pre-configured:

**Credentials:**
- Username: `admin`
- Password: `admin123`

### Demo Account Usage

1. Visit `/admin/login`
2. Enter:
   - Username: `admin`
   - Password: `admin123`
3. Click "Sign In"
4. Access the full admin dashboard

**Note:** Demo credentials are reset on backend restart.

## Common Tasks

### Access the Admin Dashboard
1. Click login icon in navbar
2. Click "Admin Login"
3. Enter credentials
4. You're in!

### Create a New Admin Account
1. Click login icon in navbar
2. Click "Admin Register"
3. Fill in all fields
4. Click "Register"
5. Account created, auto-logged in

### Logout and Clear Session
1. Open admin dashboard
2. Scroll sidebar to bottom
3. Click "LOGOUT"
4. Session cleared, redirected to login

### Return to Main Store
1. From anywhere on the site, click **SK JEWELLERS** logo
2. Redirected to home page
3. Admin session remains active

### Stay Logged In
- Your session persists when you:
  - Close the browser tab (session stays in background)
  - Refresh the page (automatic re-login)
  - Navigate to other pages (session maintained)
  - Return later (session stays until logout)

## Mobile vs Desktop

### Desktop Experience
- Full navbar with all navigation options
- Large admin dropdown menu
- Optimized sidebar layout
- Complete admin dashboard

### Mobile Experience
- Hamburger menu (☰) for navigation
- Admin section in mobile menu
- Responsive dashboard layout
- Touch-friendly buttons and inputs
- All features work on mobile

## Troubleshooting

### Login Issues

**Can't login?**
- Verify username and password
- Check Caps Lock is off
- Try demo credentials first (admin/admin123)
- Ensure backend is running
- Check internet connection

**Forgot password?**
- Current version: Reset password by contacting admin
- Future: Password recovery via email planned

### Access Issues

**Redirected to login when clicking admin?**
- You're not logged in
- Go to `/admin/login` first
- Login with your credentials

**Can't find admin links?**
- Desktop: Look for login icon (🔑) in top-right
- Mobile: Open hamburger menu (☰), scroll to Admin section

**Session expired?**
- Your access token expires after 1 day
- Logout and login again
- Session refreshes automatically

### Display Issues

**Dark mode not working?**
- Click moon/sun icon in navbar to toggle
- Preference saved automatically

**Page looks broken?**
- Try refreshing the page (F5 or Cmd+R)
- Clear browser cache if still broken
- Try different browser

## Features Coming Soon

Admin panel features currently in development:
- [ ] Product management interface
- [ ] Order processing workflow
- [ ] Customer analytics
- [ ] Inventory tracking
- [ ] Payment reconciliation
- [ ] Email notifications
- [ ] Admin reports

## Security Tips

### Best Practices

1. **Use Strong Passwords**
   - Mix uppercase, lowercase, numbers
   - At least 12 characters
   - No personal information

2. **Don't Share Credentials**
   - Keep your password private
   - Don't share account with others
   - Use different passwords for different accounts

3. **Logout When Done**
   - Always click logout when finished
   - Especially on shared computers
   - Clear browser data periodically

4. **Verify URLs**
   - Only access from official SK Jewellers site
   - Check URL starts with your domain
   - Don't click suspicious links

## Contact & Support

For help or issues:
1. Check this user guide first
2. Contact SK Jewellers support team
3. Report bugs to admin
4. Suggestions for improvements welcome

---

**Version**: 1.0  
**Last Updated**: 2024  
**Status**: Production Ready
