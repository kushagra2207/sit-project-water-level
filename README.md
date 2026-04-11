# SIT Project Water Level

A water-level monitoring project with:

- a `Node.js + Express` backend
- a `React + Vite` frontend
- a login-first dashboard flow
- optional MongoDB storage for water-level readings

The login system does **not** require MongoDB. MongoDB is only needed for storing and fetching real water-level data.

## Overview

This project has two main parts:

- `backend/`: API server for login and water-level endpoints
- `frontend/`: React dashboard UI

### Current behavior

- Login works using environment variables only
- Login data is **not stored in MongoDB**
- Water-level data is fetched from MongoDB when available
- If MongoDB is connected but no records exist, the dashboard shows an empty state
- If MongoDB is not connected, login still works but real water-level data will not appear

## Project Structure

```text
sit_project_water_level/
|-- backend/
|   |-- middleware/
|   |   `-- auth.js
|   |-- models/
|   |   `-- WaterLevel.js
|   |-- routes/
|   |   |-- auth.js
|   |   `-- waterLevel.js
|   |-- .env.example
|   |-- package.json
|   `-- server.js
|-- frontend/
|   |-- public/
|   |-- src/
|   |   |-- app/                  # App wrappers and protected app flow
|   |   |-- components/
|   |   |   |-- common/           # Buttons, cards, layout helpers
|   |   |   |-- dashboard/        # Dashboard-specific components
|   |   |   `-- forms/            # Login form
|   |   |-- connectors/
|   |   |   `-- backend/          # Frontend-to-backend connector files
|   |   |-- context/              # Auth context
|   |   |-- hooks/                # Reusable logic hooks
|   |   |-- pages/                # Login page and dashboard page
|   |   |-- services/
|   |   |   `-- http/             # Shared API client
|   |   |-- styles/               # Theme and UI styling
|   |   `-- utils/                # Constants and helpers
|   |-- .env.example
|   |-- package.json
|   `-- vite.config.js
|-- .gitignore
`-- README.md
```

## Frontend Flow

1. User opens the application
2. First page is the login page
3. User logs in with backend credentials
4. After login, user enters the main dashboard
5. Dashboard tries to load real water-level data from backend

## Tech Stack

### Frontend

- React
- Vite
- CSS

### Backend

- Node.js
- Express
- JSON Web Token (`jsonwebtoken`)
- MongoDB with Mongoose

## Backend Environment Setup

Create a file named `backend/.env`.

Example:

```env
PORT=5000
JWT_SECRET=replace_with_a_secure_secret
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
MONGODB_URI=mongodb://127.0.0.1:27017/sit_water_level
```

### Important

- `ADMIN_USERNAME` and `ADMIN_PASSWORD` are used for login
- `JWT_SECRET` is required for token generation
- `MONGODB_URI` is used only for water-level data
- If `MONGODB_URI` is empty or MongoDB is unavailable, login still works

## Frontend Environment Setup

Create a file named `frontend/.env`.

Example:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

## Installation

### Backend

```bash
cd backend
npm install
```

### Frontend

```bash
cd frontend
npm install
```

## Running the Project

Open two terminals.

### Terminal 1: Start backend

```bash
cd backend
npm run dev
```

Expected output:

```text
Server running on http://localhost:5000
```

If MongoDB is connected correctly, you should also see:

```text
Connected to MongoDB
```

### Terminal 2: Start frontend

```bash
cd frontend
npm run dev
```

Then open the local Vite URL shown in the terminal, usually:

```text
http://localhost:5173
```

## Login Details

The login page checks credentials from `backend/.env`.

Example:

- username: `admin`
- password: `admin123`

These login details are **not stored in MongoDB**.

## How Frontend Connects to Backend

The main frontend-to-backend connection is handled in:

- [frontend/src/services/http/apiClient.js](C:\Users\HP\Downloads\Projects\SIT\sit_project_water_level\frontend\src\services\http\apiClient.js)

The connector files are:

- [frontend/src/connectors/backend/authConnector.js](C:\Users\HP\Downloads\Projects\SIT\sit_project_water_level\frontend\src\connectors\backend\authConnector.js)
- [frontend/src/connectors/backend/waterLevelConnector.js](C:\Users\HP\Downloads\Projects\SIT\sit_project_water_level\frontend\src\connectors\backend\waterLevelConnector.js)

### Flow

```text
React Page / Hook
-> connector file
-> shared apiClient
-> backend API route
-> backend response
```

## Backend Routes

### Auth routes

- `POST /api/auth/login`
- `GET /api/auth/me`

These routes work without MongoDB.

### Water level routes

- `POST /api/water-level`
- `GET /api/water-level`
- `GET /api/water-level/latest`

These routes use MongoDB for storing and reading water-level data.

## How To Show Real Data On Dashboard

MongoDB alone is not enough. The database must also contain water-level records.

You can insert a test record manually:

```powershell
Invoke-RestMethod `
  -Uri "http://localhost:5000/api/water-level" `
  -Method Post `
  -ContentType "application/json" `
  -Body '{"controller_id":"ESP32_01","water_level":24.5,"percentage":68}'
```

After inserting data:

- refresh the dashboard
- latest reading should update
- stored record count should increase
- history table should show entries

## Dashboard Behavior

### When MongoDB is not connected

- login works
- dashboard opens
- water-level section shows fallback / unavailable state

### When MongoDB is connected but empty

- login works
- dashboard opens
- page shows messages like `No water level data found`
- history table remains empty

### When MongoDB is connected and records exist

- dashboard shows real values from backend
- latest reading panel shows controller, level, percentage, and timestamp
- history table shows recent data

## Troubleshooting

### Login button shows `Failed to fetch`

Possible reasons:

- backend is not running
- `frontend/.env` has wrong API URL
- backend is running on a different port

Check:

```bash
http://localhost:5000/
```

You should get a JSON response from the backend.

### Backend says MongoDB connection error

Check:

- MongoDB service is running
- `MONGODB_URI` is correct in `backend/.env`

For local MongoDB on Windows:

```powershell
Get-Service MongoDB
Start-Service MongoDB
```

### Dashboard shows `No water level data found`

This usually means:

- MongoDB is connected
- but there are no records in the `water_levels` collection yet

Insert a test record using the API and refresh the page.

## Notes

- The frontend is structured so UI, hooks, connectors, and services are separated clearly
- Login is intentionally independent from the database
- The dashboard UI uses water-inspired colors to match the project theme
- The connector layer makes future backend integration easier
