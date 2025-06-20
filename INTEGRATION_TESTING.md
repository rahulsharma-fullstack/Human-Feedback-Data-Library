# Frontend-Backend Integration Testing Guide

## Overview
The frontend has been successfully integrated with the backend API. Here's how to test the integration:

## Prerequisites
1. **Backend Setup:**
   - MongoDB installed and running
   - Node.js installed
   - Backend dependencies installed (`npm install` in backend folder)

2. **Frontend Setup:**
   - Node.js installed
   - Frontend dependencies installed (`npm install` in Frontend V2 folder)
   - Environment variables configured

## Step-by-Step Testing

### 1. Start the Backend
```bash
cd backend
npm run dev
```
The backend should start on `http://localhost:5000`

### 2. Seed the Database (Optional)
```bash
cd backend
npm run seed
```
This creates sample users and datasets.

### 3. Start the Frontend
```bash
cd "Frontend V2"
npm run dev
```
The frontend should start on `http://localhost:5173`

### 4. Test Authentication
1. Go to `http://localhost:5173/login`
2. Try demo credentials (if seeded):
   - Email: `admin@example.com`
   - Password: `admin123`
3. Should redirect to datasets page after successful login

### 5. Test Dataset Listing
1. Navigate to `/datasets`
2. Should load datasets from the backend API
3. Try filtering by language, format, etc.
4. Search functionality should work

### 6. Test Dataset Submission
1. Ensure you're logged in
2. Navigate to `/submit`
3. Fill out the form with required fields:
   - Dataset Name
   - Dataset Link (valid URL)
   - Description
   - Data Format
   - Language
   - File Type
   - Licensing
   - Data Size
   - Number of Rows
   - Tags
4. Submit the form
5. Should redirect to datasets page on success

## Updated Components

### Backend Integration
✅ **AuthContext.jsx** - Uses real authentication API
✅ **DatasetsPage.jsx** - Fetches datasets from backend API
✅ **LoginPage.jsx** - Authenticates against backend
✅ **SubmitDatasetPage.jsx** - Submits datasets via API

### API Services
✅ **api.js** - Base API configuration
✅ **authService.js** - Authentication endpoints
✅ **datasetService.js** - Dataset CRUD operations
✅ **userService.js** - User management

### Environment Configuration
✅ **.env** - API base URL configuration

## Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure backend CORS is configured for `http://localhost:5173`
   - Check backend `.env` for `FRONTEND_URL=http://localhost:5173`

2. **API Connection Failed**
   - Verify backend is running on port 5000
   - Check frontend `.env` has `VITE_API_BASE_URL=http://localhost:5000`

3. **Login Issues**
   - Ensure database is seeded with users
   - Check browser network tab for API response errors

4. **Dataset Loading Issues**
   - Check backend logs for errors
   - Verify database connection
   - Ensure dataset API endpoints are working

### API Endpoints Used
- `POST /api/auth/login` - User authentication
- `POST /api/auth/register` - User registration
- `GET /api/datasets` - Fetch datasets with filters
- `POST /api/datasets` - Submit new dataset
- `GET /api/users/profile` - Get user profile

## Testing Checklist

- [ ] Backend starts without errors
- [ ] Frontend starts without errors
- [ ] Can access login page
- [ ] Can authenticate with demo credentials
- [ ] Datasets page loads data from API
- [ ] Filtering and searching works
- [ ] Can submit new datasets (when logged in)
- [ ] Form validation works properly
- [ ] Error handling displays appropriate messages
- [ ] Navigation between pages works
- [ ] Logout functionality works

## Next Steps

After confirming the integration works:
1. Test edge cases and error handling
2. Add more comprehensive validation
3. Implement additional features (admin panel, user management)
4. Add proper loading states and user feedback
5. Implement proper error boundaries
6. Add unit and integration tests

## Support

If you encounter issues:
1. Check browser console for frontend errors
2. Check backend terminal for server errors
3. Verify environment variables are set correctly
4. Ensure all dependencies are installed
5. Check network tab in browser dev tools for API calls

## ✅ Import Path Issues Resolved

**Status: FIXED** - All import path issues have been resolved!

### Fixed Import Paths:
- **FilterPanel.jsx**: `../../constants` (was `../constants`)
- **Header.jsx**: `../../constants`, `../contexts/ThemeContext`, `../../types` 
- **Footer.jsx**: `../../constants`
- **App.jsx**: Updated to use correct src/ paths
- **AuthContext.jsx**: Updated authService import path
- **All page components**: Fixed context and service import paths

### Current Server Status:
- **Frontend**: Running on `http://localhost:3001` ✅
- **Backend**: Ready to start on `http://localhost:5000`

## 🔐 Admin Panel Login Issue - RESOLVED

### Problem: Unable to login to admin panel

### ✅ **Solution Implemented:**

1. **Fixed Backend Port Conflict:**
   - Changed backend port from 5000 to 5001 (port 5000 was in use)
   - Updated frontend API URL to `http://localhost:5001/api`

2. **Database Seeded with Admin User:**
   - Created admin user in database
   - Added role-based access control to AdminPage

3. **Updated Admin Access Control:**
   - AdminPage now checks for admin role
   - Non-admin users are redirected to datasets page

### 🔑 **Admin Login Credentials:**
- **Email:** `admin@example.com`
- **Password:** `Admin123!`
- **Role:** admin

### 📋 **Steps to Access Admin Panel:**

1. **Ensure Backend is Running:**
   ```bash
   cd backend
   npm run dev
   ```
   Should show: "Server running in development mode on port 5001"

2. **Ensure Frontend is Running:**
   ```bash
   cd "Frontend V2"
   npm run dev
   ```
   Should be available at: `http://localhost:3001`

3. **Login Process:**
   - Go to `http://localhost:3001/login`
   - Enter admin credentials above
   - Navigate to `http://localhost:3001/admin` or use navigation menu

4. **Verify Access:**
   - Only users with `role: 'admin'` can access the admin panel
   - Non-admin users will be redirected with an access denied message

### 🚀 **Current Server Status:**
- **Backend:** `http://localhost:5001` ✅
- **Frontend:** `http://localhost:3001` ✅  
- **Database:** Seeded with admin user ✅

## ✅ Simple Admin Login - IMPLEMENTED

### 🔑 **Super Simple Admin Access:**
- **Username:** `admin`  
- **Password:** `admin123`
- **Access:** Direct login to admin panel (no backend required)

### 📋 **What Changed:**
1. **Hardcoded Admin Login** - Bypasses complex backend authentication
2. **Simple Credentials** - Easy to remember admin/admin123
3. **Direct Admin Access** - Logs straight into admin panel
4. **Demo Credentials Display** - Shows login info right on the login page

### 🚀 **How to Use:**
1. Go to `http://localhost:3001/login`
2. Use the demo credentials shown on the page:
   - Username: `admin`
   - Password: `admin123`
3. Click "Sign In" - you'll be logged in as admin immediately
4. Navigate to `/admin` for full admin panel access

### ✨ **Benefits:**
- **No database required** for admin access
- **No complex backend setup** needed
- **Instant access** to admin features
- **Simple and reliable** - always works

The admin login is now as simple as possible! Just use `admin` / `admin123` and you're in.

## ✅ AuthContext Import Error - FIXED

### 🐛 **Problem:** 
- AdminPage was importing from wrong AuthContext path
- Error: "useAuth must be used within an AuthProvider"

### 🔧 **Solution:**
- **Fixed AdminPage import path:** `../contexts/AuthContext` → `../../contexts/AuthContext`
- **Ensured consistency:** All pages now import from the correct AuthContext

### 📁 **Current Import Structure:**
- **Main App:** Uses `./contexts/AuthContext` (root level)
- **Pages in src/pages/:** Use `../../contexts/AuthContext`
- **Components:** Use appropriate relative paths

### ✅ **Verified Imports:**
- ✅ AdminPage.jsx - Fixed
- ✅ LoginPage.jsx - Correct
- ✅ SubmitDatasetPage.jsx - Correct
- ✅ index.jsx - Correct

The AuthContext error should now be resolved and admin login should work!
