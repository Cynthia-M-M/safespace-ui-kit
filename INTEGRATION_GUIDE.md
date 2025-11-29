# SafeSpace UI - Backend & Frontend Integration Guide

This document outlines the complete integration between the SafeSpace frontend and backend systems.

## Architecture Overview

```
Frontend (React + TypeScript)  ↔  Backend (Node.js + Express)  ↔  Database (PostgreSQL)
        :3000                              :8000                        :5432
```

## Project Structure

### Backend (`/BACKEND`)
- **server.js** - Main Express server with Socket.io integration
- **routes/** - API endpoint definitions
  - auth.js - Authentication endpoints
  - forum.js - Forum posts and replies
  - reports.js - Incident reporting
  - emergency.js - Emergency contacts and rapid response
  - hotspots.js - Geographic hotspot data
  - analytics.js - Event logging and metrics
  - moderation.js - Content moderation
- **controllers/** - Business logic for each route
- **models/** - Database query functions
- **middleware/** - Authentication, error handling, logging
- **ml-service/** - Python ML service for content moderation
- **db/** - Database schema and seed data

### Frontend (`/FRONTEND`)
- **src/components/services/** - API service layers
  - apiClient.ts - Centralized HTTP client
  - authService.ts - User authentication
  - forumService.ts - Forum operations
  - reportService.ts - Report submission
  - emergencyService.ts - Emergency features
  - hotspotService.ts - Hotspot data
  - analyticsServices.tsx - Event tracking
  - moderationService.ts - Content moderation
- **src/lib/** - Utilities and context
  - AuthContext.tsx - Authentication state management
- **src/pages/** - Feature pages
- **vite.config.ts** - Vite build configuration

## Setup Instructions

### Prerequisites
- Node.js 16+ and npm/yarn/bun
- PostgreSQL 12+
- Python 3.8+ (for ML service)

### 1. Backend Setup

```bash
cd BACKEND

# Copy environment variables
cp .env.example .env

# Edit .env with your configuration
# DB_PASSWORD=your_password
# JWT_SECRET=your_secret_key
# CORS_ORIGIN=http://localhost:3000

# Install dependencies
npm install

# Initialize database
psql -U postgres -f db/schema.sql
psql -U postgres -d safespace -f db/seeds.sql

# Start the server
npm run dev
# Server runs at http://localhost:8000
```

### 2. Frontend Setup

```bash
cd FRONTEND

# Copy environment variables
cp .env.example .env.local

# Edit .env.local with backend URL
# VITE_API_BASE_URL=http://localhost:8000

# Install dependencies
bun install
# or: npm install

# Start dev server
bun run dev
# Frontend runs at http://localhost:3000
```

### 3. ML Service Setup (Optional)

```bash
cd BACKEND/ml-service

# Create virtual environment
python -m venv venv

# Activate virtual environment
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start ML service
python app/main.py
# ML service runs at http://localhost:8001
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Forum
- `GET /api/forum/posts` - Get all posts
- `POST /api/forum/posts` - Create new post
- `GET /api/forum/posts/:id` - Get single post
- `PUT /api/forum/posts/:id` - Update post
- `DELETE /api/forum/posts/:id` - Delete post
- `PATCH /api/forum/posts/:id/lock` - Lock post
- `GET /api/forum/posts/:postId/replies` - Get post replies
- `POST /api/forum/posts/:postId/replies` - Create reply
- `PUT /api/forum/posts/:postId/replies/:replyId` - Update reply
- `DELETE /api/forum/posts/:postId/replies/:replyId` - Delete reply

### Reports
- `GET /api/reports` - Get all reports
- `POST /api/reports` - Submit new report
- `GET /api/reports/stats` - Get report statistics
- `GET /api/reports/category/:category` - Filter by category
- `GET /api/reports/severity/:severity` - Filter by severity

### Emergency
- `POST /api/emergency/contacts` - Get emergency contacts for location
- `GET /api/emergency/countries` - Get available countries
- `GET /api/emergency/hotline` - Get hotline for country
- `POST /api/emergency/report` - Submit emergency report

### Hotspots
- `GET /api/hotspots` - Get all hotspots
- `POST /api/hotspots` - Create hotspot (admin)
- `GET /api/hotspots/:id` - Get single hotspot
- `PUT /api/hotspots/:id` - Update hotspot (admin)
- `DELETE /api/hotspots/:id` - Delete hotspot (admin)
- `GET /api/hotspots/nearby` - Get nearby hotspots
- `GET /api/hotspots/stats` - Get hotspot statistics
- `GET /api/hotspots/heatmap` - Get heatmap data

### Analytics
- `POST /api/analytics/log` - Log analytics event
- `GET /api/analytics` - Get all logs
- `GET /api/analytics/dashboard/metrics` - Get dashboard metrics
- `GET /api/analytics/dashboard/incident-types` - Get incident distribution
- `GET /api/analytics/dashboard/demographics` - Get demographic data
- `GET /api/analytics/engagement` - Get engagement metrics
- `GET /api/analytics/safety-stats` - Get safety statistics

### Moderation
- `POST /api/moderation/check` - Check content safety
- `POST /api/moderation/detect-harassment` - Detect harassment
- `POST /api/moderation/batch-check` - Batch moderate contents
- `GET /api/moderation/stats` - Get moderation statistics
- `POST /api/moderation/report` - Report flagged content

## Frontend Service Usage

### Authentication
```typescript
import { authService } from '@/components/services/authService';

// Register
const user = await authService.register({
  email: 'user@example.com',
  password: 'password',
  handle: 'username'
});

// Login
const { token, user } = await authService.login({
  email: 'user@example.com',
  password: 'password'
});

// Logout
authService.logout();
```

### Forum Posts
```typescript
import { forumService } from '@/components/services/forumService';

// Get posts
const posts = await forumService.getPosts();

// Create post
const post = await forumService.createPost({
  title: 'Post Title',
  body: 'Post content',
  is_anonymous: true
});

// Create reply
const reply = await forumService.createReply(postId, {
  body: 'Reply content',
  is_anonymous: true
});
```

### Reports
```typescript
import { reportService } from '@/components/services/reportService';

// Submit report
const report = await reportService.createReport({
  category: 'harassment',
  severity: 'high',
  description: 'Incident details',
  location_text: 'Location name'
});

// Get statistics
const stats = await reportService.getReportStats();
```

### Emergency
```typescript
import { emergencyService } from '@/components/services/emergencyServices';

// Get emergency contacts
const contacts = await emergencyService.getEmergencyContacts('Kenya');

// Get available countries
const countries = await emergencyService.getAvailableCountries();
```

### Analytics
```typescript
import { analyticsService } from '@/components/services/analyticsServices';

// Log event
await analyticsService.logEvent('user_registration', { source: 'mobile' });

// Get dashboard metrics
const metrics = await analyticsService.getDashboardMetrics('7d');
```

## Authentication Flow

1. **Login/Register**: User credentials sent to backend
2. **Token Generation**: Backend returns JWT token
3. **Token Storage**: Frontend stores token in localStorage
4. **Authenticated Requests**: API client automatically includes token in Authorization header
5. **Token Expiration**: If token expires (401), user is redirected to login

## Error Handling

The API client includes automatic error handling:
- Network errors are caught and returned with helpful messages
- 401 responses trigger automatic logout and redirect to login
- Server errors include error messages in response

## Development Guidelines

### Adding a New Feature

1. **Define API Endpoint** in backend route
2. **Implement Controller Logic** in backend controller
3. **Create Service Layer** in frontend service file
4. **Update Components** to use new service
5. **Test with Postman** or similar tool

### Database Migrations

When modifying the schema:
1. Update `db/schema.sql`
2. Run migrations: `psql -U postgres -d safespace -f db/schema.sql`
3. Update corresponding backend models

## Troubleshooting

### CORS Errors
Ensure `CORS_ORIGIN` in backend `.env` matches your frontend URL

### Database Connection Errors
Check PostgreSQL is running and connection string is correct

### ML Service Errors
If ML service is unavailable, API falls back to safe defaults

### Token Expiration
Check `JWT_EXPIRY` setting and adjust if needed

## Production Deployment

1. **Backend**: Deploy to server with `npm start`
2. **Frontend**: Build with `npm run build` and serve static files
3. **Database**: Set up PostgreSQL on production server
4. **Environment Variables**: Update `.env` files for production
5. **CORS**: Update `CORS_ORIGIN` to production frontend URL
6. **SSL/TLS**: Enable HTTPS in production

## Support

For issues or questions, please check the logs:
- Backend logs: Console output from `npm run dev`
- Frontend logs: Browser DevTools console
- Database logs: PostgreSQL logs in /var/log/postgresql/

## License

ISC
