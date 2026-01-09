# PrimeTrade Internship Assignment - Scalable Web App

This is a full-stack web application built with the MERN stack (MongoDB, Express, React, Node.js) and TailwindCSS, designed to be modern, scalable, and secure.

## Features

- **Authentication**: Secure JWT-based signup and login with bcrypt password hashing.
- **Dashboard**: Protected route displaying user stats and task management.
- **Task Management**: Full CRUD (Create, Read, Update, Delete) operations for tasks.
- **Responsive Design**: Fully responsive UI built with TailwindCSS.
- **Security**: HttpOnly cookie support (optional configuration), JWT in headers, Password Hashing.

## Tech Stack

- **Frontend**: React (Vite), TailwindCSS, Lucide React (Icons), Axios, React Router DOM.
- **Backend**: Node.js, Express, MongoDB (Mongoose), JWT, BcryptJS.

## Prerequisites

- Node.js installed.
- MongoDB installed and running locally on port 27017 (or update `.env`).

## Setup Instructions

### 1. Backend Setup

Navigate to the server directory and install dependencies:

```bash
cd server
npm install
```

Start the server:

```bash
npm run dev
# Server runs on http://localhost:5000
```

### 2. Frontend Setup

Navigate to the client directory and install dependencies:

```bash
cd client
npm install
```

Start the development server:

```bash
npm run dev
# Client runs on http://localhost:5173
```

## Environment Variables

The server uses a `.env` file (created automatically):

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/primetrade_internship
JWT_SECRET=supersecretkey123
```

## API Endpoints

- `POST /api/auth/register` - Create a new account
- `POST /api/auth/login` - Login
- `GET /api/tasks` - Get user tasks
- `POST /api/tasks` - Create a task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task
