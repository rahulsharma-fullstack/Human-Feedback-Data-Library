# Human Feedback Data Library Backend

A comprehensive Node.js backend API for managing human feedback datasets with authentication, dataset management, and admin capabilities.

## Features

- **User Authentication & Authorization**
  - JWT-based authentication
  - Role-based access control (User, Admin, Moderator)
  - User profile management

- **Dataset Management**
  - Dataset submission and review process
  - Advanced search and filtering
  - Rating and download tracking
  - Featured datasets

- **Admin Panel**
  - Dataset approval/rejection workflow
  - User management
  - Dashboard with statistics

- **Security & Performance**
  - Input validation and sanitization
  - Rate limiting
  - CORS configuration
  - Comprehensive error handling

## Tech Stack

- **Runtime**: Node.js with ES6 modules
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: express-validator
- **Security**: Helmet, CORS, bcryptjs
- **Development**: Nodemon for hot reloading

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## Installation

1. **Clone and navigate to the backend directory**
   ```powershell
   cd backend
   ```

2. **Install dependencies**
   ```powershell
   npm install
   ```

3. **Set up environment variables**
   ```powershell
   cp .env.example .env
   ```
   
   Edit the `.env` file with your configuration:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/human_feedback_db
   JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
   CORS_ORIGINS=http://localhost:5173,http://localhost:3000
   ```

4. **Start MongoDB**
   Make sure MongoDB is running on your system.

5. **Seed the database (optional)**
   ```powershell
   npm run seed
   ```

6. **Start the development server**
   ```powershell
   npm run dev
   ```

The API will be available at `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user info
- `POST /api/auth/logout` - Logout user
- `POST /api/auth/verify-token` - Verify JWT token

### Datasets
- `GET /api/datasets` - Get all approved datasets (with search/filter)
- `GET /api/datasets/featured` - Get featured datasets
- `GET /api/datasets/:id` - Get single dataset
- `POST /api/datasets` - Submit new dataset (auth required)
- `PUT /api/datasets/:id` - Update dataset (owner/admin only)
- `DELETE /api/datasets/:id` - Delete dataset (owner/admin only)
- `POST /api/datasets/:id/download` - Track dataset download
- `POST /api/datasets/:id/rate` - Rate a dataset (auth required)

### Users
- `GET /api/users/profile` - Get current user profile (auth required)
- `PUT /api/users/profile` - Update user profile (auth required)
- `GET /api/users/datasets` - Get user's submitted datasets (auth required)
- `GET /api/users/:id/public` - Get public user profile
- `GET /api/users/stats` - Get user statistics (auth required)
- `DELETE /api/users/account` - Deactivate account (auth required)

### Admin
- `GET /api/admin/dashboard` - Admin dashboard stats (admin/moderator only)
- `GET /api/admin/users` - Get all users (admin/moderator only)
- `GET /api/admin/datasets` - Get all datasets (admin/moderator only)
- `PUT /api/admin/datasets/:id/review` - Review dataset (admin/moderator only)
- `PUT /api/admin/datasets/:id/featured` - Toggle featured status (admin only)
- `PUT /api/admin/users/:id` - Update user (admin only)
- `DELETE /api/admin/datasets/:id` - Delete dataset (admin only)

## Database Schema

### User Model
```javascript
{
  username: String (unique),
  email: String (unique),
  password: String (hashed),
  firstName: String,
  lastName: String,
  role: ['user', 'admin', 'moderator'],
  isActive: Boolean,
  lastLogin: Date,
  submittedDatasets: [ObjectId],
  profile: {
    organization: String,
    bio: String,
    website: String,
    researchInterests: [String]
  },
  preferences: {
    emailNotifications: Boolean,
    datasetUpdates: Boolean
  }
}
```

### Dataset Model
```javascript
{
  name: String,
  description: String,
  link: String,
  tags: [String],
  dataFormat: String,
  language: String,
  dataSize: String,
  numRows: Number,
  fileType: String,
  licensing: String,
  categories: [String],
  originatingPlatform: String,
  submittedBy: ObjectId,
  status: ['pending', 'approved', 'rejected', 'under_review'],
  reviewNotes: String,
  reviewedBy: ObjectId,
  reviewedAt: Date,
  downloads: Number,
  views: Number,
  ratings: [{
    user: ObjectId,
    rating: Number (1-5),
    comment: String,
    createdAt: Date
  }],
  isPublic: Boolean,
  isFeatured: Boolean,
  metadata: {
    originalSubmissionDate: Date,
    lastUpdated: Date,
    version: String,
    doi: String,
    citation: String
  }
}
```

## Sample Users (after seeding)

| Username | Email | Password | Role |
|----------|-------|----------|------|
| admin | admin@example.com | Admin123! | admin |
| researcher1 | researcher1@university.edu | Research123! | user |
| datascientist | data@company.com | DataSci123! | user |

## Development Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with hot reload
- `npm run seed` - Seed database with sample data

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Input validation and sanitization
- Rate limiting to prevent abuse
- CORS configuration
- Helmet for security headers
- Role-based access control

## Error Handling

The API includes comprehensive error handling with:
- Validation errors
- Authentication errors
- Database errors
- 404 for not found resources
- 500 for server errors
- Detailed error messages in development mode

## Rate Limiting

Default rate limits:
- 100 requests per 15 minutes per IP
- Configurable via environment variables

## Logging

All requests are logged with:
- Timestamp
- HTTP method and URL
- IP address
- User agent
- Response time and status code

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
