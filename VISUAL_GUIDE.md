# SafeSpace - Visual Integration Guide

## 🎯 Application Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     WEB BROWSER (User)                          │
│                  http://localhost:5173                          │
└────────────────────────────┬────────────────────────────────────┘
                             │
                ┌────────────┴────────────┐
                │                         │
        ┌───────▼──────┐         ┌───────▼──────┐
        │   React App  │         │   Services   │
        │  (Frontend)  │         │    Layer     │
        └───────┬──────┘         └───────▲──────┘
                │                        │
        ┌───────▼────────────────────────┴──────┐
        │    API Client (apiClient.ts)          │
        │  • JWT Token Injection                │
        │  • Error Handling                     │
        │  • Request/Response Processing        │
        └───────┬────────────────────────────────┘
                │
        ┌───────▼────────────────────────────────┐
        │     Express Backend (Node.js)          │
        │   http://localhost:3001                │
        │                                        │
        │  Routes:                               │
        │  • /api/analytics                      │
        │  • /api/moderation                     │
        │  • /api/reports                        │
        │  • /api/forum                          │
        │  • /api/hotspots                       │
        │  • /api/emergency                      │
        │  • /api/auth                           │
        └───────┬────────────────────────────────┘
                │
        ┌───────▴────────────────────────────────┐
        │      PostgreSQL Database               │
        │    localhost:5432/safespace            │
        │                                        │
        │  Tables:                               │
        │  • users                               │
        │  • reports                             │
        │  • forum_posts & replies               │
        │  • hotspots                            │
        │  • analytics_logs                      │
        │  • + 5 more tables                     │
        └────────────────────────────────────────┘
```

---

## 📱 Page Integration Map

```
HOME (/) 
├─ Real Data: analyticsService.getDashboardMetrics('7d')
├─ Fetches: { totalReports, activeUsers, safetyRating }
├─ Updates: Every 5 minutes (auto-refresh)
└─ Status: ✅ LIVE

REALTIMEDETECTION (/detection)
├─ Real Data: moderationService.detectHarassment(content)
├─ Fetches: { threatLevel, confidence, status }
├─ Analyzes: User input for harassment patterns
└─ Status: ✅ LIVE

DASHBOARD (/dashboard)
├─ Real Data: analyticsService.getDashboardMetrics('7d')
├─ Displays: 4 stat cards with metrics
├─ Updates: Every 5 minutes (auto-refresh)
└─ Status: ✅ LIVE

SETTINGS (/settings)
├─ State: Local component state (ready for backend)
├─ Manages: 16 settings across 4 categories
├─ Ready: POST /api/auth/user/settings
└─ Status: ✅ LIVE

SURVIVORSUPPORT (/support)
├─ Content: Static resources & helplines
├─ Backend: Not required (static page)
└─ Status: ✅ LIVE
```

---

## 🔄 Data Flow Example: Home Page

```
User Opens http://localhost:5173/
    │
    ├─→ React renders Home component
    │   └─→ useEffect hook triggers
    │       └─→ Calls: loadMetrics()
    │           │
    │           └─→ analyticsService.getDashboardMetrics('7d')
    │               │
    │               └─→ apiClient.get('/api/analytics/dashboard?range=7d')
    │                   │
    │                   ├─→ Adds JWT token to header
    │                   │
    │                   └─→ Backend receives request
    │                       │
    │                       ├─→ Verifies JWT token
    │                       │
    │                       ├─→ Queries database:
    │                       │   • COUNT(reports) WHERE created_at > 7 days ago
    │                       │   • COUNT(DISTINCT users)
    │                       │   • AVG(safety_score)
    │                       │
    │                       └─→ Returns JSON response:
    │                           {
    │                             "totalReports": 45,
    │                             "activeUsers": 238,
    │                             "safetyRating": 87
    │                           }
    │
    │
    ├─→ Frontend receives response
    │   │
    │   └─→ setMetrics(data)
    │       │
    │       └─→ Component re-renders with real data
    │           │
    │           ├─→ Displays "45" reports
    │           ├─→ Displays "238" active users
    │           └─→ Displays "87" safety rating
    │
    └─→ Auto-refresh timer set for 5 minutes
        └─→ Cycle repeats in 300 seconds
```

---

## 🔐 Authentication Flow

```
1. User Enters Credentials
   │
   ├─→ authService.login(email, password)
   │
   └─→ POST /api/auth/login
       │
       ├─→ Backend hashes password
       ├─→ Compares with database
       │
       ├─→ If valid:
       │   ├─→ Generate JWT token (24h expiry)
       │   ├─→ Return { token, user }
       │   │
       │   └─→ Frontend stores token in localStorage
       │       └─→ Token attached to all future requests
       │
       └─→ If invalid:
           └─→ Return 401 Unauthorized
               └─→ Show error toast: "Invalid credentials"

2. JWT Token Flow
   │
   ├─→ Every API request includes token:
   │   │
   │   └─→ Authorization: Bearer {jwt_token}
   │
   ├─→ Backend middleware verifies token
   │   │
   │   ├─→ If valid → Continue to handler
   │   └─→ If invalid → Return 401 Unauthorized
   │
   └─→ User automatically logged in for 24 hours
       └─→ Or until logout is clicked
```

---

## 📊 Service Layer Pattern

```
Component (Home.tsx)
    │
    ├─→ imports analyticsService
    │
    ├─→ useEffect(() => {
    │   │
    │   └─→ const metrics = await analyticsService.getDashboardMetrics('7d')
    │       │
    │       └─→ Service handles:
    │           • Calling apiClient
    │           • Error handling
    │           • Type checking
    │           • Response parsing
    │
    │   └─→ setMetrics(metrics)
    │
    │   }, [])
    │
    └─→ Render with metrics data
```

### Why This Pattern?
```
❌ WITHOUT Service Layer:
   Component → apiClient → Backend
   (Tight coupling, repeated code)

✅ WITH Service Layer:
   Component → Service → apiClient → Backend
   (Loose coupling, reusable, typed)
```

---

## 🧪 Testing Flow Example

```
Test Home Page
    │
    ├─→ Start backend: npm run dev
    │   └─→ Server running on http://localhost:3001
    │
    ├─→ Start frontend: npm run dev
    │   └─→ Vite server on http://localhost:5173
    │
    ├─→ Navigate to http://localhost:5173
    │
    ├─→ Wait 2-3 seconds for data to load
    │
    ├─→ Verify data displays:
    │   ├─→ Total Reports: ✅ Number appears
    │   ├─→ Active Users: ✅ Number appears
    │   └─→ Safety Rating: ✅ Percentage appears
    │
    ├─→ Check browser console: ✅ No errors
    │
    ├─→ Check Network tab: ✅ API call returns 200
    │
    └─→ Wait 5 minutes: ✅ Data auto-refreshes
```

---

## 📈 Real-Time Update Mechanism

```
Page Loads
    │
    ├─→ useEffect runs once
    │
    ├─→ setInterval(loadData, 300000)  // 5 minutes = 300,000 ms
    │
    ├─→ First load: Immediate
    │
    ├─→ Timer starts: [====                              ] 0%
    │   ├─→ 1 min:   [========                          ] 20%
    │   ├─→ 2 min:   [================                  ] 40%
    │   ├─→ 3 min:   [========================          ] 60%
    │   ├─→ 4 min:   [================================  ] 80%
    │   │
    │   └─→ 5 min:   [====================================] 100%
    │       └─→ loadData() called again
    │           └─→ Fresh data fetched from backend
    │               └─→ Components re-render with new data
    │
    └─→ Timer resets, cycle repeats
```

---

## 🛡️ Error Handling Flow

```
Try to Fetch Data
    │
    ├─→ TRY:
    │   │
    │   ├─→ const data = await analyticsService.getDashboardMetrics('7d')
    │   │
    │   ├─→ Success? → setMetrics(data) → Show data
    │   │
    │   └─→ Error? → CATCH block
    │
    │
    ├─→ CATCH:
    │   │
    │   ├─→ console.error(error)
    │   │
    │   ├─→ toast.error('Failed to load metrics')
    │   │   │
    │   │   └─→ Toast notification appears for 3 seconds
    │   │       "❌ Failed to load metrics"
    │   │
    │   └─→ setMetrics(defaultValues)
    │       └─→ Show default/empty state
    │
    │
    └─→ FINALLY:
        │
        └─→ setLoading(false)
            └─→ Remove loading spinner
```

---

## 🔗 API Connection Example

```
Frontend Makes Request
    │
    └─→ analyticsService.getDashboardMetrics('7d')
        │
        └─→ apiClient.get('/api/analytics/dashboard?range=7d', {
                headers: {
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIs...',
                    'Content-Type': 'application/json'
                }
            })
            │
            └─→ Backend Receives Request
                │
                ├─→ Middleware: Verify JWT token
                │   ├─→ Valid? → Continue
                │   └─→ Invalid? → Return 401
                │
                ├─→ Controller: analyticsController.getDashboard()
                │
                ├─→ Query Database:
                │   │
                │   ├─→ SELECT COUNT(*) FROM reports 
                │   │   WHERE created_at > NOW() - '7 days'::interval
                │   │
                │   ├─→ SELECT COUNT(DISTINCT user_id) FROM analytics_logs
                │   │
                │   └─→ SELECT AVG(safety_score) FROM analytics_logs
                │
                ├─→ Build Response JSON:
                │   {
                │       "success": true,
                │       "data": {
                │           "totalReports": 45,
                │           "activeUsers": 238,
                │           "safetyRating": 87.5
                │       }
                │   }
                │
                └─→ Return 200 OK + JSON body
                    │
                    └─→ Frontend Receives Response
                        │
                        ├─→ Parse JSON
                        ├─→ Update state: setMetrics(data)
                        └─→ Components re-render with new data
```

---

## 🎯 Integration Checklist Visual

```
Frontend Pages
├─ Home.tsx                    ✅ CONNECTED → analyticsService
├─ RealTimeDetection.tsx       ✅ CONNECTED → moderationService
├─ Dashboard.tsx               ✅ CONNECTED → analyticsService
├─ Settings.tsx                ✅ CONNECTED → State ready
└─ SurvivorSupport.tsx          ✅ CONNECTED → Static

Backend Routes
├─ /api/analytics              ✅ 4 endpoints
├─ /api/moderation             ✅ 8 endpoints
├─ /api/reports                ✅ 6 endpoints
├─ /api/forum                  ✅ 5 endpoints
├─ /api/replies                ✅ 3 endpoints
├─ /api/hotspots               ✅ 4 endpoints
├─ /api/emergency              ✅ 3 endpoints
└─ /api/auth                   ✅ 5 endpoints

Services
├─ analyticsService            ✅ 4 methods
├─ moderationService           ✅ 8 methods
├─ reportService               ✅ 6 methods
├─ authService                 ✅ 5 methods
├─ emergencyServices           ✅ 3 methods
├─ forumService                ✅ 5 methods
└─ hotspotService              ✅ 4 methods

Database Tables
├─ users                       ✅ Created
├─ reports                     ✅ Created
├─ forum_posts                 ✅ Created
├─ forum_replies               ✅ Created
├─ hotspots                    ✅ Created
├─ analytics_logs              ✅ Created
├─ countries                   ✅ Created
├─ emergency_contacts          ✅ Created
├─ harassment_categories       ✅ Created
└─ moderation_queues           ✅ Created
```

---

## 🚀 Full System Startup

```
Terminal 1: Database
    │
    ├─→ PostgreSQL service running
    │
    └─→ Database: safespace (10 tables created)


Terminal 2: Backend
    │
    ├─→ cd BACKEND
    ├─→ npm run dev
    │
    └─→ ✅ Server running on http://localhost:3001
        ├─→ Express app listening
        ├─→ Database connected
        ├─→ JWT middleware active
        └─→ Ready for requests


Terminal 3: Frontend  
    │
    ├─→ cd FRONTEND
    ├─→ npm run dev
    │
    └─→ ✅ Vite dev server running on http://localhost:5173
        ├─→ React components loaded
        ├─→ Services initialized
        ├─→ API client configured
        └─→ Ready for user interaction


Browser
    │
    ├─→ Open http://localhost:5173
    │
    └─→ ✅ Application loads
        ├─→ Home page shows real metrics
        ├─→ Auto-refresh timer starts (5 min)
        ├─→ All pages functional
        └─→ Ready for testing
```

---

## 🎉 Success Indicators

```
✅ When Integration is Working:

□ Backend console shows: "Server running on http://localhost:3001"
□ Frontend console shows: "Local: http://localhost:5173"
□ Browser loads without errors
□ Home page displays: Total Reports, Active Users, Safety Rating
□ Console shows no red errors
□ Network tab shows API requests returning 200
□ Home page auto-refreshes every 5 minutes
□ All pages can be navigated to
□ Settings toggles work
□ Detection page accepts input
□ Toast notifications appear on actions
□ No "Cannot find module" errors
□ No "API error" messages
```

---

**Visual Guide Complete! Ready to start testing?**
**Next: Open QUICK_REFERENCE.md to begin.**
