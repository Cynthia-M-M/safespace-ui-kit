# Accordion Component - Complete Backend Implementation

## Summary

I've generated a complete, production-ready backend system for your accordion component with full frontend integration. Here's what was created:

## Files Created

### Backend (Node.js/Express)

1. **`BACKEND/routes/accordion.js`** - API route definitions
   - GET/POST/PUT/DELETE endpoints for accordion sections
   - User preference management endpoints

2. **`BACKEND/controllers/accordionController.js`** - Business logic
   - Section management (CRUD)
   - User preference handling
   - Error handling and validation

3. **`BACKEND/models/accordionModel.js`** - Database layer
   - Async/await database queries
   - Follows your project's model pattern
   - Promise-based interactions

4. **`BACKEND/db/accordion_schema.sql`** - Database schema
   - `accordion_sections` table - stores accordion content
   - `accordion_preferences` table - stores user state
   - Includes sample data

### Frontend (React/TypeScript)

1. **`FRONTEND/src/components/ui/accordion-with-backend.tsx`** - Enhanced component
   - Fetches data from backend
   - Handles loading/error states
   - Saves user preferences
   - Supports category filtering

2. **`FRONTEND/src/components/services/accordionServices.tsx`** - API client
   - Centralized service layer
   - All API operations
   - JWT authentication support

3. **`FRONTEND/src/components/AccordionExample.tsx`** - Usage examples
   - Shows how to implement the component
   - Multiple category examples

4. **`FRONTEND/src/components/AccordionAdmin.tsx`** - Admin dashboard
   - Create, edit, delete accordion sections
   - Manage categories and display order
   - Full CRUD interface

### Configuration

1. **`FRONTEND/.env.example`** - Environment variables template
2. **`ACCORDION_INTEGRATION_GUIDE.md`** - Complete integration documentation

## Key Features

✅ Dynamic content loading from backend
✅ User preference persistence (remembers opened items)
✅ Category-based filtering
✅ Admin panel for content management
✅ JWT authentication support
✅ Error handling and loading states
✅ Fully typed TypeScript
✅ Follows your project structure

## Quick Start

### 1. Database Setup
```bash
# Run SQL schema
mysql -u root -p < BACKEND/db/accordion_schema.sql
```

### 2. Add Route to Backend
In `BACKEND/server.js`:
```javascript
const accordionRoutes = require('./routes/accordion');
app.use('/api/accordion', accordionRoutes);
```

### 3. Use in Frontend
```tsx
import { AccordionWithBackend } from '@/components/ui/accordion-with-backend';

export function Help() {
  return <AccordionWithBackend category="help" />;
}
```

## Database Tables

**accordion_sections** (stores content)
- id, title, content, category, display_order, is_active

**accordion_preferences** (stores user state)
- id, user_id, open_items (JSON), theme, expanded_by_default

## API Endpoints

- `GET /api/accordion/sections` - Get all sections
- `GET /api/accordion/sections/:id` - Get single section
- `POST /api/accordion/sections` - Create (admin)
- `PUT /api/accordion/sections/:id` - Update (admin)
- `DELETE /api/accordion/sections/:id` - Delete (admin)
- `GET /api/accordion/preferences/:userId` - Get user prefs
- `POST /api/accordion/preferences/:userId` - Save user prefs

## Authentication

The component uses JWT tokens from localStorage:
- Token key: `authToken` (for admin operations)
- User ID key: `userId` (for saving preferences)

## Notes

- All backend code follows your project's patterns
- Includes error handling and validation
- Compatible with your existing middleware
- Database uses your connection pattern
- Full TypeScript types included

For detailed integration instructions, see `ACCORDION_INTEGRATION_GUIDE.md`
