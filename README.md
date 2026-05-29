# Auth Todo Notes API

A backend **Authentication + Notes/Todo CRUD API** built with **Node.js**, **Express.js**, **MongoDB**, **Mongoose**, **JWT**, **bcryptjs**, and **cookie-parser**.

This project demonstrates how to build a backend application with user registration, login authentication, JWT-based cookie sessions, and user-specific notes management.

---

## Project Status

![Node.js](https://img.shields.io/badge/Node.js-Backend-green)
![Express.js](https://img.shields.io/badge/Express.js-API-black)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-brightgreen)
![Mongoose](https://img.shields.io/badge/Mongoose-ODM-red)
![JWT](https://img.shields.io/badge/JWT-Authentication-orange)
![Status](https://img.shields.io/badge/Status-Completed-blue)
![License](https://img.shields.io/badge/License-ISC-yellow)

---

## Overview

Auth Todo Notes API is a backend project that allows users to register, login, and manage their own notes.

After login, the server generates a JWT token and stores it in a cookie. That cookie is then used to identify the logged-in user while creating, reading, updating, and deleting notes.

The project is useful for learning:

* User registration
* User login
* Password hashing
* JWT authentication
* Cookie-based token handling
* Protected CRUD APIs
* MongoDB and Mongoose integration
* Express route and controller structure

---

## Tech Stack

| Technology    | Purpose                                  |
| ------------- | ---------------------------------------- |
| Node.js       | JavaScript runtime                       |
| Express.js    | Backend framework                        |
| MongoDB       | NoSQL database                           |
| Mongoose      | MongoDB object modeling                  |
| JWT           | User authentication                      |
| bcryptjs      | Password hashing and password comparison |
| cookie-parser | Reading cookies from requests            |
| dotenv        | Environment variable management          |
| nodemon       | Development server auto-restart          |

---

## Features

* User registration
* User login
* Password hashing using bcryptjs
* JWT token generation
* Cookie-based authentication
* Create notes for logged-in users
* Get all notes of logged-in user
* Get single note by ID
* Update note by ID
* Delete note by ID
* MongoDB database connection
* MVC-style backend structure
* Environment variable support

---

## Repository Structure

```txt
auth-todo/
│
├── README.md
│
└── 1stAttempt/
    ├── server.js
    ├── package.json
    ├── package-lock.json
    ├── .env
    ├── .gitignore
    │
    └── src/
        ├── app.js
        │
        ├── config/
        │   └── db.js
        │
        ├── controllers/
        │   ├── auth.controller.js
        │   └── notes.controller.js
        │
        ├── models/
        │   ├── users.model.js
        │   └── notes.model.js
        │
        └── routes/
            ├── auth.routes.js
            └── notes.routes.js
```

---

## Main Project Folder

The working backend project is inside:

```bash
cd 1stAttempt
```

Run all installation and server commands from the `1stAttempt` folder.

---

## Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Vishnu-R-8848/auth-todo-task.git
```

### 2. Move Into the Project Folder

```bash
cd auth-todo-task/1stAttempt
```

### 3. Install Dependencies

```bash
npm install
```

---

## Environment Variables

Create a `.env` file inside the `1stAttempt` folder.

```env
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

Example for local MongoDB:

```env
PORT=4000
MONGO_URI=mongodb://127.0.0.1:27017/auth-todo-api
JWT_SECRET=my_super_secret_key
```

Example for MongoDB Atlas:

```env
PORT=4000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/auth-todo-api
JWT_SECRET=my_super_secret_key
```

---

## Running the Project

### Development Mode

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

After starting the server, the backend will run on:

```txt
http://localhost:4000
```

Default route:

```http
GET /
```

Response:

```txt
Hello World!
```

---

## API Base URLs

```txt
Authentication API: http://localhost:4000/api/auth
Notes API:          http://localhost:4000/api/notes
```

---

## Authentication Flow

```txt
1. User registers using username, email, and password.
2. Password is hashed before storing in MongoDB.
3. User logs in using email and password.
4. Server verifies the password.
5. Server creates a JWT token.
6. JWT token is stored in a cookie named token.
7. Notes APIs read the token from cookies.
8. Logged-in user can create, read, update, and delete notes.
```

---

## Auth API Endpoints

| Method | Endpoint             | Description         | Access |
| ------ | -------------------- | ------------------- | ------ |
| POST   | `/api/auth/register` | Register a new user | Public |
| POST   | `/api/auth/login`    | Login existing user | Public |

---

## Notes API Endpoints

| Method | Endpoint                | Description                    | Access    |
| ------ | ----------------------- | ------------------------------ | --------- |
| POST   | `/api/notes/create`     | Create a new note              | Protected |
| GET    | `/api/notes/get-all`    | Get all logged-in user's notes | Protected |
| GET    | `/api/notes/:id`        | Get a single note by ID        | Protected |
| PATCH  | `/api/notes/update/:id` | Update note description by ID  | Protected |
| DELETE | `/api/notes/delete/:id` | Delete a note by ID            | Protected |

---

## Models

### User Model

```js
{
  username: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  }
}
```

The user model includes a method for comparing entered password with hashed password.

```js
user.matchPassword(enteredPassword)
```

---

### Note Model

```js
{
  title: {
    type: String,
    required: true,
    minlength: 5,
    unique: true
  },
  description: {
    type: String,
    minlength: 10
  },
  user: String
}
```

Mongoose automatically adds:

```txt
createdAt
updatedAt
```

because timestamps are enabled.

---

## API Documentation

## 1. Register User

```http
POST /api/auth/register
```

Request body:

```json
{
  "username": "vishnu",
  "email": "vishnu@example.com",
  "password": "Pass@123"
}
```

Success response:

```json
{
  "message": "User registered successfully",
  "user": {
    "_id": "665845a123456789abcd1234",
    "username": "vishnu",
    "email": "vishnu@example.com",
    "password": "$2b$10$hashedPasswordValue"
  }
}
```

Cookie created:

```txt
token=jwt_token_value
```

---

## 2. Login User

```http
POST /api/auth/login
```

Request body:

```json
{
  "email": "vishnu@example.com",
  "password": "Pass@123"
}
```

Success response:

```json
{
  "message": "User logged in successfully",
  "user": {
    "_id": "665845a123456789abcd1234",
    "username": "vishnu",
    "email": "vishnu@example.com",
    "password": "$2b$10$hashedPasswordValue"
  }
}
```

Cookie created:

```txt
token=jwt_token_value
```

---

## 3. Create Note

```http
POST /api/notes/create
```

Request body:

```json
{
  "title": "Learn Auth",
  "description": "Today I learned JWT authentication with cookies."
}
```

Success response:

```json
{
  "message": "Note created successfully",
  "note": {
    "_id": "665845a123456789abcd1234",
    "title": "Learn Auth",
    "description": "Today I learned JWT authentication with cookies.",
    "user": "vishnu@example.com",
    "createdAt": "2026-05-28T10:00:00.000Z",
    "updatedAt": "2026-05-28T10:00:00.000Z"
  }
}
```

---

## 4. Get All Notes

```http
GET /api/notes/get-all
```

Success response:

```json
{
  "message": "Notes fetched successfully",
  "notes": [
    {
      "_id": "665845a123456789abcd1234",
      "title": "Learn Auth",
      "description": "Today I learned JWT authentication with cookies.",
      "user": "vishnu@example.com",
      "createdAt": "2026-05-28T10:00:00.000Z",
      "updatedAt": "2026-05-28T10:00:00.000Z"
    }
  ]
}
```

---

## 5. Get Single Note

```http
GET /api/notes/:id
```

Example:

```txt
http://localhost:4000/api/notes/665845a123456789abcd1234
```

Success response:

```json
{
  "message": "Note fetched successfully",
  "note": {
    "_id": "665845a123456789abcd1234",
    "title": "Learn Auth",
    "description": "Today I learned JWT authentication with cookies.",
    "user": "vishnu@example.com",
    "createdAt": "2026-05-28T10:00:00.000Z",
    "updatedAt": "2026-05-28T10:00:00.000Z"
  }
}
```

---

## 6. Update Note

```http
PATCH /api/notes/update/:id
```

Example:

```txt
http://localhost:4000/api/notes/update/665845a123456789abcd1234
```

Request body:

```json
{
  "description": "Updated note description after learning authentication."
}
```

Success response:

```json
{
  "message": "Note updated successfully",
  "note": {
    "_id": "665845a123456789abcd1234",
    "title": "Learn Auth",
    "description": "Updated note description after learning authentication.",
    "user": "vishnu@example.com",
    "createdAt": "2026-05-28T10:00:00.000Z",
    "updatedAt": "2026-05-28T10:20:00.000Z"
  }
}
```

---

## 7. Delete Note

```http
DELETE /api/notes/delete/:id
```

Example:

```txt
http://localhost:4000/api/notes/delete/665845a123456789abcd1234
```

Success response:

```json
{
  "message": "Note deleted successfully",
  "note": {
    "_id": "665845a123456789abcd1234",
    "title": "Learn Auth",
    "description": "Updated note description after learning authentication.",
    "user": "vishnu@example.com"
  }
}
```

---

## Validation Rules

### Register Validation

| Field    | Rule                                                                                 |
| -------- | ------------------------------------------------------------------------------------ |
| username | Required, minimum 3 characters                                                       |
| email    | Required, valid email format                                                         |
| password | Required, minimum 6 characters, must include letters, numbers, and special character |

### Login Validation

| Field    | Rule                                                                                 |
| -------- | ------------------------------------------------------------------------------------ |
| email    | Required, valid email format                                                         |
| password | Required, minimum 6 characters, must include letters, numbers, and special character |

### Note Validation

| Field       | Rule                                          |
| ----------- | --------------------------------------------- |
| title       | Required, minimum 5 characters, unique        |
| description | Required in controller, minimum 10 characters |
| user        | Added from logged-in user's email             |

---

## Error Response Examples

### Missing Username

```json
{
  "error": "Username is required"
}
```

### Invalid Email

```json
{
  "error": "Invalid email format"
}
```

### Invalid Password

```json
{
  "error": "Password must be at least 6 characters long and contain both letters, numbers and special characters."
}
```

### Unauthorized

```json
{
  "error": "Unauthorized"
}
```

### Invalid Note ID

```json
{
  "error": "Invalid Note ID format"
}
```

### Note Not Found

```json
{
  "error": "Note not found"
}
```

---

## Postman Testing Flow

Use this order while testing:

```txt
1. Start the server using npm run dev
2. Register a user using POST /api/auth/register
3. Login using POST /api/auth/login
4. Confirm the token cookie is saved in Postman
5. Create a note using POST /api/notes/create
6. Get all notes using GET /api/notes/get-all
7. Copy one note _id
8. Get single note using GET /api/notes/:id
9. Update note using PATCH /api/notes/update/:id
10. Delete note using DELETE /api/notes/delete/:id
11. Get all notes again and confirm deletion
```

Important: Notes APIs depend on the `token` cookie. Register or login first before testing notes routes.

---

## Scripts

Inside the `1stAttempt` folder, the following scripts are available:

| Command       | Description                     |
| ------------- | ------------------------------- |
| `npm start`   | Starts the server using Node.js |
| `npm run dev` | Starts the server using nodemon |
| `npm test`    | Placeholder test command        |

---

## Git Ignore

Recommended `.gitignore`:

```txt
node_modules
.env
.DS_Store
```

Do not push these files/folders to GitHub:

```txt
node_modules
.env
```

The `.env` file contains private MongoDB and JWT credentials.

---

## Recommended `.env.example`

Create a `.env.example` file inside `1stAttempt`.

```env
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

---

## Current Limitations

Current limitations of this version:

* No logout API
* No refresh token
* No centralized authentication middleware
* Notes ownership is stored using user email instead of user ID
* Get single, update, and delete note routes do not fully check note ownership
* No global error handler
* No 404 route handler
* No duplicate email/title error handling
* No automated test cases
* Cookie options are not production-configured with `httpOnly`, `secure`, and `sameSite`

---

## Future Improvements

Planned improvements:

* Add logout API
* Add separate authentication middleware
* Store note owner using MongoDB user `_id`
* Protect all note operations by ownership
* Add refresh token support
* Hide password from API responses
* Add duplicate email error handling
* Add duplicate note title error handling
* Add global error handling middleware
* Add 404 route handler
* Add input validation middleware
* Add Helmet security middleware
* Add CORS configuration
* Add rate limiting
* Add pagination
* Add search and filter notes
* Add tests using Jest and Supertest
* Add Swagger API documentation
* Deploy backend on Render or Railway

---

## Learning Outcomes

This project helped in understanding:

* Express server setup
* MongoDB connection
* Mongoose models
* User authentication flow
* Password hashing using bcryptjs
* JWT token generation
* Cookie-based authentication
* Protected API routes
* CRUD operations
* Route and controller separation
* Postman API testing
* Git and GitHub project submission workflow

---

## Best Practices Used

* Separate route files
* Separate controller files
* Separate model files
* Separate database configuration
* Environment variable usage
* Password hashing before storing
* JWT-based authentication
* Cookie-based token handling
* Mongoose schema validation
* Organized backend folder structure

---

## Assignment Submission

Final project folder:

```txt
1stAttempt/
```

GitHub repository:

```txt
https://github.com/Vishnu-R-8848/auth-todo-task
```

---

## Author

**Vishnu R**

BCA Student | MERN Stack Learner

GitHub: [Vishnu-R-8848](https://github.com/Vishnu-R-8848)

---

## License

This project is licensed under the ISC License.
