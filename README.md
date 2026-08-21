# Medicare

Medicare is a full-stack doctor discovery and appointment booking application. Patients can create an account, browse doctors, view doctor profiles, submit reviews, choose an appointment slot, and create a booking.

The project contains:

- A React and Vite frontend styled with Tailwind CSS.
- A Node.js and Express REST API.
- MongoDB persistence through Mongoose.
- User registration and login with bcrypt password hashing and JWT creation.
- CRUD endpoints for doctors, bookings, and reviews.

> **Current implementation note:** The payment page confirms an appointment and creates a booking; it does not connect to a payment gateway. The backend returns a JWT during login, but the current frontend stores the logged-in user in `localStorage` and does not send the JWT in an authorization header. API routes currently do not enforce authentication or role-based authorization.

## Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Frontend Pages](#frontend-pages)
- [API Reference](#api-reference)
- [Data Models](#data-models)
- [Example API Requests](#example-api-requests)
- [Troubleshooting](#troubleshooting)
- [Security and Production Notes](#security-and-production-notes)

## Features

### Patient experience

- Browse the home page and available medical services.
- View the doctor directory with specialization, experience, consultation fee, hospital, and photo.
- Open an individual doctor profile.
- Register as a patient and log in.
- Select today, tomorrow, or a custom appointment date.
- Select an appointment time slot and create a booking.
- Submit a rating and written review for a doctor.
- Log out from the navigation bar.

### Backend capabilities

- Register users with hashed passwords.
- Authenticate users with email and password.
- Create, read, update, and delete doctor records.
- Create, read, update, and delete bookings.
- Create, read, update, and delete reviews.
- Populate doctor and user references when reading bookings and reviews.

## Technology Stack

| Area | Technology |
| --- | --- |
| Frontend | React 18, React Router 6, Axios |
| Build tool | Vite 6 |
| Styling | Tailwind CSS 3, PostCSS, Autoprefixer |
| Backend | Node.js, Express 5 |
| Database | MongoDB, Mongoose 9 |
| Authentication | bcryptjs, jsonwebtoken |
| Development | Nodemon |

## Project Structure

```text
medicare-main/
├── backend/
│   ├── config/db.js              # MongoDB connection
│   ├── controllers/              # Request handlers
│   ├── models/                   # Mongoose schemas
│   ├── routes/                   # Express route definitions
│   ├── server.js                 # API entry point
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── api/axios.js          # Axios API client
│   │   ├── components/           # Header and footer
│   │   ├── context/              # Authentication context
│   │   ├── layout/               # Shared application layout
│   │   ├── pages/                # Application screens
│   │   └── routes/               # React Router configuration
│   ├── index.html
│   └── package.json
└── README.md
```

## Prerequisites

Install the following before starting the project:

- Node.js 18 or newer, with npm.
- MongoDB running locally or a MongoDB Atlas connection string.
- Git, if cloning the repository.

Check your Node.js and npm versions:

```bash
node --version
npm --version
```

## Installation

From the repository root, install dependencies for both applications:

```bash
cd backend
npm install

cd ../frontend
npm install
```

## Environment Variables

Create `backend/.env` with the following values:

```env
MONGO_URI=mongodb://127.0.0.1:27017/medicareDB
PORT=5000
JWT_SECRET=replace-with-a-long-random-secret
```

### Variable reference

| Variable | Required | Description |
| --- | --- | --- |
| `MONGO_URI` | Yes | MongoDB connection string used by Mongoose. |
| `PORT` | Yes | Port used by the Express server. The frontend currently expects `5000`. |
| `JWT_SECRET` | Yes | Secret used to sign login tokens. Use a strong secret outside local development. |

The frontend API client is configured in `frontend/src/api/axios.js` with:

```js
baseURL: "http://localhost:5000/api"
```

If the backend runs on another host or port, update that value and update the CORS origin in `backend/server.js` as needed.

## Running the Application

Start MongoDB first, then use two terminals from the repository root.

### Terminal 1: backend

```bash
cd backend
npm run dev
```

The API starts at [http://localhost:5000](http://localhost:5000). Its health response is available at `GET /` and returns `Medicare API Running`.

### Terminal 2: frontend

```bash
cd frontend
npm run dev
```

Open the URL printed by Vite, normally [http://localhost:5173](http://localhost:5173).

### Production-style frontend check

```bash
cd frontend
npm run build
npm run preview
```

Available npm scripts:

| Directory | Command | Purpose |
| --- | --- | --- |
| `backend` | `npm run dev` | Start Express with Nodemon. |
| `backend` | `npm start` | Start Express with Node.js. |
| `frontend` | `npm run dev` | Start the Vite development server. |
| `frontend` | `npm run build` | Create a production frontend build. |
| `frontend` | `npm run preview` | Preview the production build locally. |

## Frontend Pages

| Path | Screen | Description |
| --- | --- | --- |
| `/` | Home | Landing page with service highlights and navigation actions. |
| `/signup` | Signup | Creates a patient account. |
| `/login` | Login | Authenticates an existing user. |
| `/doctors` | Doctors | Loads and displays all doctors from the API. |
| `/doctor/:id` | Doctor Details | Shows a doctor profile, reviews, and booking action. |
| `/payment/:id` | Appointment Confirmation | Selects a date/time and creates a booking. |
| `/services` | Services | Lists specialties and links to matching doctors. |
| `/contact` | Contact | Displays the contact page. |

## API Reference

The API base URL is `http://localhost:5000/api`.

### Authentication

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/auth/register` | Register a user. |
| `POST` | `/auth/login` | Log in and receive a JWT and user object. |

### Doctors

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/doctors` | Create a doctor. |
| `GET` | `/doctors` | Return all doctors in `{ success, data }`. |
| `GET` | `/doctors/:id` | Return one doctor by MongoDB ID. |
| `PUT` | `/doctors/:id` | Update a doctor. |
| `DELETE` | `/doctors/:id` | Delete a doctor. |

### Bookings

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/bookings` | Create an appointment booking. |
| `GET` | `/bookings` | Return all bookings with doctor and user names/emails populated. |
| `GET` | `/bookings/:id` | Return one booking by MongoDB ID. |
| `PUT` | `/bookings/:id` | Update a booking. |
| `DELETE` | `/bookings/:id` | Delete a booking. |

### Reviews

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/reviews` | Create a doctor review. |
| `GET` | `/reviews` | Return all reviews with doctor and user details populated. |
| `PUT` | `/reviews/:id` | Update a review. |
| `DELETE` | `/reviews/:id` | Delete a review. |

## Data Models

### User

Required fields are `name`, `email`, and `password`. Other fields are:

```json
{
	"name": "Asha Patel",
	"email": "asha@example.com",
	"password": "your-password",
	"role": "patient",
	"gender": "female"
}
```

`role` accepts `patient`, `doctor`, or `admin`, and defaults to `patient`. `gender` accepts `male`, `female`, or `other`.

### Doctor

`name`, `specialization`, and `ticketPrice` are required.

```json
{
	"name": "Dr. Meera Shah",
	"specialization": "Cardiologist",
	"experience": 12,
	"ticketPrice": 800,
	"photo": "https://example.com/doctor.jpg",
	"hospital": "City Health Center"
}
```

### Booking

```json
{
	"doctor": "DOCTOR_MONGODB_ID",
	"user": "USER_MONGODB_ID",
	"appointmentDate": "2026-08-21T09:00:00.000Z",
	"ticketPrice": 800,
	"status": "pending"
}
```

`doctor` and `user` reference MongoDB documents. `appointmentDate` and `ticketPrice` are required; `status` defaults to `pending`.

### Review

```json
{
	"doctor": "DOCTOR_MONGODB_ID",
	"user": "USER_MONGODB_ID",
	"reviewText": "Very helpful consultation.",
	"rating": 5
}
```

`reviewText` and `rating` are required. `rating` must be between `0` and `5`.

## Example API Requests

Register a patient:

```bash
curl -X POST http://localhost:5000/api/auth/register \
	-H "Content-Type: application/json" \
	-d '{"name":"Asha Patel","email":"asha@example.com","password":"change-me","role":"patient","gender":"female"}'
```

Log in:

```bash
curl -X POST http://localhost:5000/api/auth/login \
	-H "Content-Type: application/json" \
	-d '{"email":"asha@example.com","password":"change-me"}'
```

Create a doctor:

```bash
curl -X POST http://localhost:5000/api/doctors \
	-H "Content-Type: application/json" \
	-d '{"name":"Dr. Meera Shah","specialization":"Cardiologist","experience":12,"ticketPrice":800,"hospital":"City Health Center"}'
```

List doctors:

```bash
curl http://localhost:5000/api/doctors
```

## Troubleshooting

### MongoDB connection fails

- Confirm that MongoDB is running.
- Check `MONGO_URI` in `backend/.env`.
- Confirm that the database host and port are reachable.
- Restart the backend after changing `.env`.

### The frontend cannot load doctors

- Confirm the backend is running on port `5000`.
- Open `http://localhost:5000/` and confirm the health response.
- Check that `frontend/src/api/axios.js` uses the correct API base URL.
- Check the browser console and backend terminal for CORS or request errors.

### Port already in use

Change `PORT` in `backend/.env`, then update the Axios `baseURL` in `frontend/src/api/axios.js` to use the same port.

### The frontend has stale login state

The current authentication context stores the user in browser `localStorage`. Use the Logout button or remove the `user` item from local storage while testing a different account.

## Security and Production Notes

Before deploying this application:

- Replace the local MongoDB URI with a protected production database.
- Generate a long, random `JWT_SECRET` and keep `.env` out of source control.
- Restrict CORS to the deployed frontend origin instead of allowing a fixed local origin.
- Add JWT verification middleware to protected endpoints.
- Add role-based authorization for doctor, booking, and administrative operations.
- Avoid returning password hashes in registration and login responses.
- Validate request bodies and handle invalid MongoDB IDs consistently.
- Add booking ownership checks so users can access only their own bookings.
- Integrate and verify a real payment provider before describing an appointment as paid.
- Add rate limiting, security headers, structured logging, and HTTPS.
- Add automated tests for authentication, CRUD operations, and booking validation.

## License

No license file is currently included in this repository.
