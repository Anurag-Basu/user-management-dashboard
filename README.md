# User Management Dashboard

Full-stack app for adding, viewing, editing, and deleting users.

## How to run

You need **Node.js 20+** and **npm**. Run the backend and frontend in two terminals.

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env
```

Edit `backend/.env` and set your MongoDB connection string:

```
PORT=4000
MONGODB_DB_NAME=user_management
MONGODB_URI=mongodb+srv://USER:PASSWORD@cluster0.xxxxx.mongodb.net/user_management
```

Then start the API:

```bash
npm run dev
```

Backend runs at http://localhost:4000

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:5173

The Vite dev server proxies `/api` to the backend, so keep both processes running.

## Features

- Dashboard with search, pagination (10 users per page), view, edit, and delete
- Create and edit forms with client-side validation
- User details page
- REST API with server-side validation, duplicate-email checks, and error handling
- MongoDB Atlas (database `user_management`, collection `users`)

## Screenshots

### Dashboard

![Dashboard with user list, search, and pagination](frontend/public/dashboard.png)

### Create user

![Create user form](frontend/public/create-user.png)

### User details

![User details page](frontend/public/view-user.png)

### Edit user

![Edit user form](frontend/public/edit-user.png)

### Delete user

![Delete user confirmation dialog](frontend/public/delete-user.png)

## Tech stack

- **Frontend:** React, Vite, TypeScript, React Router, Axios
- **Backend:** Node.js, Express, TypeScript
- **Database:** MongoDB with Mongoose

## Environment variables

| Variable | Default | Description |
| --- | --- | --- |
| `PORT` | `4000` | Backend port |
| `MONGODB_DB_NAME` | `user_management` | MongoDB database name |
| `MONGODB_URI` | `mongodb://localhost:27017/user_management` | MongoDB connection string |

Do not commit `backend/.env`. Use `.env.example` as a template.

## Frontend routes

| Path | Page |
| --- | --- |
| `/` | Dashboard |
| `/users/new` | Create user |
| `/users/:id` | User details |
| `/users/:id/edit` | Edit user |

## API

User fields: `name`, `email`, `phone`, `company`, and `address` (`street`, `city`, `zipcode`, `geo.lat`, `geo.lng`).

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/api/users` | Paginated users. Query: `page`, `limit` (default 10), `q` (search) |
| `GET` | `/api/users/:id` | One user |
| `POST` | `/api/users` | Create a user |
| `PUT` | `/api/users/:id` | Update a user |
| `DELETE` | `/api/users/:id` | Delete a user |

`GET /api/users` response:

```json
{
  "users": [],
  "total": 0,
  "page": 1,
  "limit": 10,
  "totalPages": 0
}
```

## Folder structure

```
user-management-dashboard/
├── frontend/src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── hooks/
│   ├── routes/
│   └── utils/
├── backend/src/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── validators/
│   └── config/
└── README.md
```
