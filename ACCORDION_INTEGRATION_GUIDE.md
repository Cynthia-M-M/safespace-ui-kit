# Accordion Component - Backend Integration Guide

## Overview
This guide explains how to integrate the enhanced accordion component with your SafeSpace backend.

## Components Created

### 1. Backend Files

#### `BACKEND/routes/accordion.js`
- RESTful API endpoints for accordion management
- Handles CRUD operations for accordion sections
- Manages user preferences (saved state)

#### `BACKEND/controllers/accordionController.js`
- Business logic for accordion operations
- Fetches sections from database
- Manages user preferences

#### `BACKEND/models/accordionModel.js`
- Database queries using async/await pattern
- Wrapper around raw database queries
- Follows model pattern of your project

#### `BACKEND/db/accordion_schema.sql`
- Database schema for accordion tables
- Two main tables:
  - `accordion_sections`: Stores accordion content
  - `accordion_preferences`: Stores user preferences

### 2. Frontend Files

#### `FRONTEND/src/components/ui/accordion-with-backend.tsx`
- Enhanced accordion component with backend integration
- Fetches data from API
- Saves user preferences (open/closed state)
- Displays loading and error states

#### `FRONTEND/src/components/services/accordionServices.tsx`
- API client for accordion operations
- Centralized service layer for all accordion API calls
- Handles authentication with JWT tokens

#### `FRONTEND/src/components/AccordionExample.tsx`
- Example implementation
- Shows how to use `AccordionWithBackend` component
- Demonstrates filtering by category

#### `FRONTEND/src/components/AccordionAdmin.tsx`
- Admin dashboard for managing accordion sections
- Create, read, update, delete operations
- Manage categories and display order

## Installation Steps

### 1. Database Setup

Run the SQL schema in your database:
```sql
-- Run accordion_schema.sql
```

Or execute via Node.js:
```bash
cd BACKEND
node -e "const db = require('./db/connection'); const fs = require('fs'); const sql = fs.readFileSync('./db/accordion_schema.sql', 'utf8'); db.query(sql, (err) => { if(err) console.error(err); else console.log('Schema created'); db.end(); });"
```

### 2. Backend Integration

Add the accordion route to your `server.js`:
```javascript
const accordionRoutes = require('./routes/accordion');
app.use('/api/accordion', accordionRoutes);
```

### 3. Frontend Integration

Import and use the component in your pages:

```tsx
import { AccordionWithBackend } from '@/components/ui/accordion-with-backend';

// In your component
<AccordionWithBackend 
  category="help"
  onOpenChange={(items) => console.log(items)}
/>
```

## Database Schema

### accordion_sections table
```
- id: INT (Primary Key)
- title: VARCHAR(255)
- content: LONGTEXT
- display_order: INT
- is_active: BOOLEAN
- category: VARCHAR(100)
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

### accordion_preferences table
```
- id: INT (Primary Key)
- user_id: INT (Foreign Key)
- open_items: JSON (array of section IDs)
- theme: VARCHAR(50)
- expanded_by_default: BOOLEAN
- updated_at: TIMESTAMP
```

## API Endpoints

### Get all sections
```
GET /api/accordion/sections
Response: { success: true, data: [...], count: n }
```

### Get section by ID
```
GET /api/accordion/sections/:id
Response: { success: true, data: {...} }
```

### Create section (Admin)
```
POST /api/accordion/sections
Body: { title, content, display_order, is_active, category }
Response: { success: true, id: n }
```

### Update section (Admin)
```
PUT /api/accordion/sections/:id
Body: { title, content, display_order, is_active, category }
Response: { success: true, message: "..." }
```

### Delete section (Admin)
```
DELETE /api/accordion/sections/:id
Response: { success: true, message: "..." }
```

### Get user preferences
```
GET /api/accordion/preferences/:userId
Response: { success: true, data: {...} }
```

### Save user preferences
```
POST /api/accordion/preferences/:userId
Body: { open_items: [...], theme: "light", expanded_by_default: false }
Response: { success: true, message: "..." }
```

## Usage Examples

### Basic Usage
```tsx
import { AccordionWithBackend } from '@/components/ui/accordion-with-backend';

export function HelpPage() {
  return <AccordionWithBackend />;
}
```

### With Category Filter
```tsx
<AccordionWithBackend category="emergency" />
```

### With Callback
```tsx
<AccordionWithBackend 
  onOpenChange={(items) => {
    console.log('User opened:', items);
  }}
/>
```

### Admin Panel
```tsx
import AccordionAdmin from '@/components/AccordionAdmin';

export function AdminDashboard() {
  return <AccordionAdmin />;
}
```

## Authentication

The component uses JWT tokens stored in `localStorage`:
- Token key: `authToken`
- Used for admin operations (create, update, delete)

## Environment Variables

Create a `.env` file in FRONTEND directory:
```
VITE_API_URL=http://localhost:5000/api
```

## Notes

1. **User ID**: The component uses `localStorage.getItem('userId')` to save preferences
2. **Authentication**: Admin operations require valid JWT token in localStorage
3. **Categories**: Default categories are: 'general', 'help', 'faq', 'emergency'
4. **Display Order**: Lower numbers appear first (0 = top)

## Troubleshooting

### Component shows "No accordion sections available"
- Check if database tables are created
- Verify API endpoint is accessible
- Check browser console for network errors

### Preferences not saving
- Verify user is logged in (userId in localStorage)
- Check authentication token
- Verify server logs for errors

### Admin operations fail
- Ensure user has admin privileges
- Verify JWT token is valid
- Check middleware authentication

## Support

For issues or questions about implementation, refer to:
1. Backend controller: `BACKEND/controllers/accordionController.js`
2. Frontend service: `FRONTEND/src/components/services/accordionServices.tsx`
3. Admin component: `FRONTEND/src/components/AccordionAdmin.tsx`
