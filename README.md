# User Management Dashboard

Full-stack web app for adding, viewing, editing, and deleting users.

## Tech stack

- Frontend: React.js (Vite + TypeScript), React Router, Axios
- Backend: Node.js, Express.js, TypeScript
- Database: MongoDB with Mongoose

## Folder structure

```
user-management-dashboard/
├── frontend/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── services/
│       ├── hooks/
│       ├── routes/
│       └── utils/
│
├── backend/
│   └── src/
│       ├── controllers/
│       ├── routes/
│       ├── models/
│       ├── middleware/
│       ├── validators/
│       └── config/
│
└── README.md
```

## Setup instructions

### Prerequisites

- Node.js 20+
- npm

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at http://localhost:5173

### Backend

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Backend runs at http://localhost:4000

## Frontend routes

| Path | Page |
| --- | --- |
| `/` | Dashboard |
| `/users/new` | Create user |
| `/users/:id` | User details |
| `/users/:id/edit` | Edit user |

## Backend API routes

| Method | Path | Description |
| --- | --- | --- |
| GET | `/api/users` | Return all users |
| GET | `/api/users/:id` | Return a single user by ID |
| POST | `/api/users` | Create a new user |
| PUT | `/api/users/:id` | Update a user |
| DELETE | `/api/users/:id` | Delete a user |

Feature implementation is not included yet.
