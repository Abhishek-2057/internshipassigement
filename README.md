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

# 🚀 Task Management API

A RESTful API for user authentication and task management using JWT authentication.

---

## 🌐 Base URL

```
http://localhost:5000/api
```

---

## 🔐 Authentication Endpoints (`/api/auth`)

### ✅ Register User
**Method:** POST  
**Endpoint:**
```
/auth/register
```

**Request Body (JSON):**
```json
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123"
}
```

---

### ✅ Login User
**Method:** POST  
**Endpoint:**
```
/auth/login
```

**Request Body (JSON):**
```json
{
  "email": "test@example.com",
  "password": "password123"
}
```

**Response:**
- Returns a JWT token.
- Use this token for protected routes.

---

### 🔒 Get Current User
**Method:** GET  
**Endpoint:**
```
/auth/me
```

**Headers:**
```
Authorization: Bearer <YOUR_TOKEN>
```

---

## 📝 Task Endpoints (`/api/tasks`)

All task endpoints require authentication.

---

### 🔒 Get All Tasks
**Method:** GET  
**Endpoint:**
```
/tasks
```

**Headers:**
```
Authorization: Bearer <YOUR_TOKEN>
```

---

### 🔒 Create Task
**Method:** POST  
**Endpoint:**
```
/tasks
```

**Headers:**
```
Authorization: Bearer <YOUR_TOKEN>
```

**Request Body (JSON):**
```json
{
  "title": "My New Task",
  "description": "This is a description of the task."
}
```

---

### 🔒 Update Task
**Method:** PUT  
**Endpoint:**
```
/tasks/:id
```

> Replace `:id` with the actual Task ID.

**Headers:**
```
Authorization: Bearer <YOUR_TOKEN>
```

**Request Body (JSON):**
```json
{
  "title": "Updated Task Title",
  "description": "Updated description content."
}
```

---

### 🔒 Delete Task
**Method:** DELETE  
**Endpoint:**
```
/tasks/:id
```

> Replace `:id` with the actual Task ID.

**Headers:**
```
Authorization: Bearer <YOUR_TOKEN>
```

---

## 🧪 Testing with Postman

### 1. Register User
```
POST http://localhost:5000/api/auth/register
```

**Body (raw JSON):**
```json
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123"
}
```

---

### 2. Login User
```
POST http://localhost:5000/api/auth/login
```

**Body (raw JSON):**
```json
{
  "email": "test@example.com",
  "password": "password123"
}
```

➡️ Copy the token from the response.

---

### 3. Get Current User
```
GET http://localhost:5000/api/auth/me
```

**Headers:**
```
Authorization: Bearer <PASTE_YOUR_TOKEN_HERE>
```

---

### 4. Get All Tasks
```
GET http://localhost:5000/api/tasks
```

**Headers:**
```
Authorization: Bearer <PASTE_YOUR_TOKEN_HERE>
```

---

### 5. Create Task
```
POST http://localhost:5000/api/tasks
```

**Headers:**
```
Authorization: Bearer <PASTE_YOUR_TOKEN_HERE>
```

**Body (raw JSON):**
```json
{
  "title": "My New Task",
  "description": "This is a description of the task."
}
```

---

### 6. Update Task
```
PUT http://localhost:5000/api/tasks/<TASK_ID>
```

**Headers:**
```
Authorization: Bearer <PASTE_YOUR_TOKEN_HERE>
```

**Body (raw JSON):**
```json
{
  "title": "Updated Task Title",
  "description": "Updated description content."
}
```

---

### 7. Delete Task
```
DELETE http://localhost:5000/api/tasks/<TASK_ID>
```

**Headers:**
```
Authorization: Bearer <PASTE_YOUR_TOKEN_HERE>
```

---

## 🛠 Tech Stack

- Node.js  
- Express.js  
- MongoDB  
- JWT Authentication  
- REST API  

---

## 📌 Author

Developed by **Your Name**

