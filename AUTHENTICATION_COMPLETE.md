# Complete Authentication System Documentation

## Overview

Your portfolio now has a complete authentication system with signup, login, and password reset flows using Supabase Auth.

## Authentication Pages

### 1. **Login Page** (`/admin/login`)

- **URL**: `https://yoursite.com/admin/login`
- **Purpose**: Authenticate existing users
- **Features**:
  - Email and password fields
  - "Forgot password?" link
  - "Create account" link for new signups
  - Error handling
  - Loading states

### 2. **Signup Page** (`/admin/signup`)

- **URL**: `https://yoursite.com/admin/signup`
- **Purpose**: Create new admin accounts
- **Features**:
  - Email validation
  - Password strength requirements (8+ chars, uppercase, lowercase, number, special char)
  - Confirm password field
  - Email verification flow
  - Success confirmation screen

### 3. **Forgot Password Page** (`/admin/forgot-password`)

- **URL**: `https://yoursite.com/admin/forgot-password`
- **Purpose**: Request password reset email
- **Features**:
  - Email-based password reset
  - Confirmation screen with next steps
  - Resend option

### 4. **Reset Password Page** (`/admin/reset-password`)

- **URL**: Accessed via reset link in email
- **Purpose**: Set new password after clicking reset link
- **Features**:
  - Password strength validation
  - Confirm password field
  - Success confirmation

## Auth Flow Diagrams

### Sign Up Flow

```
User → Signup Page
  ↓
Enter Email + Password (with strength validation)
  ↓
Submit to Supabase.auth.signUp()
  ↓
Supabase sends verification email
  ↓
Success screen shows (check email)
  ↓
User clicks link in email
  ↓
Email verified in Supabase
  ↓
User can now login
```

### Login Flow

```
User → Login Page
  ↓
Enter Email + Password
  ↓
Submit to Supabase.auth.signInWithPassword()
  ↓
✓ Credentials valid
  ↓
Session created (access token stored)
  ↓
Redirect to /admin dashboard
  ↓
AuthContext detects session
  ↓
User data & admin status loaded
```

### Password Reset Flow

```
User → Forgot Password Page
  ↓
Enter Email
  ↓
Submit to Supabase.auth.resetPasswordForEmail()
  ↓
Supabase sends reset email
  ↓
Success screen shows (check email)
  ↓
User clicks reset link in email
  ↓
Supabase verifies token, creates session
  ↓
User redirected to Reset Password page
  ↓
User enters new password
  ↓
Submit to Supabase.auth.updateUser()
  ↓
Password updated
  ↓
Success screen shows (can login with new password)
```

## Password Requirements

All passwords must meet these criteria:

- ✓ At least 8 characters long
- ✓ At least one uppercase letter (A-Z)
- ✓ At least one lowercase letter (a-z)
- ✓ At least one number (0-9)
- ✓ At least one special character (!@#$%^&\*)

**Examples of valid passwords:**

- `SecurePass123!`
- `MyPortfolio@2024`
- `AdminAccess#99`

## Email Configuration in Supabase

### Required Email Templates

You need to configure these in Supabase dashboard:

1. **Confirmation Email**
   - Sent when: User signs up
   - Contains: Verification link
   - User action: Click link to confirm email
   - Where to configure: Auth → Email Templates → Confirm signup

2. **Password Reset Email**
   - Sent when: User requests password reset
   - Contains: Password reset link
   - User action: Click link to reset password
   - Where to configure: Auth → Email Templates → Reset Password

### Setting Up Email Templates

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Navigate to your project → Authentication → Email Templates
3. Configure these templates:
   - **Confirm signup**: Default template includes verification link
   - **Reset Password**: Default template includes reset link

### Email Link Configuration

Update these in your Supabase settings:

**Site URL** (Project → Settings → General):

```
https://ayeshaattaria.site
```

**Redirect URLs** (Project → Settings → Authentication):

```
https://ayeshaattaria.site/admin/login
https://ayeshaattaria.site/admin/reset-password
```

## Admin Verification Process

### Automatic Admin Addition (Manual for Now)

After a user signs up and verifies their email:

1. **Find the new user's ID**:
   - Go to Supabase Dashboard
   - Navigate to Authentication → Users
   - Find the user by email
   - Copy their UUID (ID field)

2. **Add them to admins table**:
   - Go to SQL Editor
   - Run this query:

   ```sql
   INSERT INTO admins (id, email, role, created_at, updated_at)
   VALUES (
     '[PASTE_USER_UUID_HERE]',
     '[their-email@example.com]',
     'admin',
     NOW(),
     NOW()
   );
   ```

   - Replace `[PASTE_USER_UUID_HERE]` with actual UUID
   - Replace `[their-email@example.com]` with their email

### Automated Admin Addition (Future Enhancement)

To automatically add admins, you could:

**Option 1: Use Supabase Functions**

```sql
-- Create a trigger that adds new users to admins table
CREATE TRIGGER add_admin_on_signup
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION add_new_admin();
```

**Option 2: Use Next.js API Route**
Create an endpoint that:

1. Receives new user signup notification
2. Checks if email is in whitelist
3. Automatically inserts into admins table

## Security Considerations

### ✅ Already Implemented

- Password strength validation (client + server via Supabase)
- Email verification before account can be used
- Row Level Security on admins table
- Bearer token authentication on all admin API routes
- Admin verification before content operations
- Session management in AuthContext

### 🔒 Additional Security Tips

1. Enable 2FA in Supabase for production
2. Set strong rate limits on auth endpoints
3. Monitor suspicious login attempts
4. Use strong JWT expiration times (default: 1 hour)
5. Implement CAPTCHA on signup page for production
6. Set email whitelist for admin domain only (e.g., @yourcompany.com)

## Testing the Auth System

### Test Signup

1. Go to `/admin/signup`
2. Enter a test email: `test@example.com`
3. Enter password: `SecureTest123!`
4. Click "Create Account"
5. Should see "Verify Your Email" screen
6. In production, email would be sent (local: check Supabase logs)

### Test Login

1. After email verification
2. Go to `/admin/login`
3. Enter email and password
4. Should redirect to `/admin` dashboard

### Test Password Reset

1. Go to `/admin/forgot-password`
2. Enter your email
3. Should see "Check Your Email" screen
4. In production, email would be sent (local: check Supabase logs)

### Test API Route Protection

```bash
# Without token (should get 401)
curl -X POST http://localhost:3000/api/blogs

# With invalid token (should get 401)
curl -X POST http://localhost:3000/api/blogs \
  -H "Authorization: Bearer invalid_token"

# With valid token but non-admin user (should get 403)
curl -X POST http://localhost:3000/api/blogs \
  -H "Authorization: Bearer valid_user_token"

# With valid token and admin user (should work)
curl -X POST http://localhost:3000/api/blogs \
  -H "Authorization: Bearer admin_token"
```

## Troubleshooting

### Problem: "Invalid or expired reset link"

- **Solution**: Reset links expire after 24 hours. Request a new one.

### Problem: Password doesn't meet requirements

- **Solution**: Use strong password with all required characters.

### Problem: Email not received

- **Solution**:
  - Check spam folder
  - Verify SMTP settings in Supabase
  - Check email logs in Supabase dashboard

### Problem: User cannot login after signup

- **Solution**:
  - Email may not be verified. Check confirmation link in email.
  - User may not be in admins table. Check manually and add if needed.

## Next Steps

1. ✅ Test signup/login/password reset flows
2. ✅ Configure email templates in Supabase
3. ✅ Add initial admin users via SQL
4. ✅ Set up email domain verification
5. ⏳ (Optional) Set up automated admin verification
6. ⏳ (Optional) Add 2FA for extra security

## Related Files

- **Auth Context**: `app/context/AuthContext.tsx`
- **Providers Wrapper**: `app/providers.tsx`
- **Login Page**: `app/admin/login/page.tsx`
- **Signup Page**: `app/admin/signup/page.tsx`
- **Forgot Password**: `app/admin/forgot-password/page.tsx`
- **Reset Password**: `app/admin/reset-password/page.tsx`
- **Admin Layout**: `app/admin/layout.tsx` (protects all admin routes)
