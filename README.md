# Table Booking System

A web application that allows store owners to manage their stores and tables, and guests to book tables at these stores.

## Features

### For Store Owners
- User registration and authentication
- Store creation and management
- Table management within stores
- View and manage bookings
- Dashboard with booking statistics

### For Guests
- Browse available stores
- View store details and available tables
- Book tables for specific dates and times
- Manage bookings (cancel, reschedule)

## Tech Stack

- **Frontend**: React.js, React Router, Bootstrap
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Testing**: Jest, Supertest

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)

### Installation

1. Clone the repository
```
git clone <repository-url>
cd booking-website
```

2. Install dependencies
```
npm run install-all
```

3. Create a `.env` file in the root directory with the following variables:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

4. Start the development server
```
npm run dev
```

5. Open your browser and navigate to `http://localhost:3000`

## API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user
- `GET /api/auth/me` - Get current user information

### Store Endpoints
- `GET /api/stores` - Get all stores
- `GET /api/stores/:id` - Get a specific store
- `POST /api/stores` - Create a new store (owner only)
- `PUT /api/stores/:id` - Update a store (owner only)
- `DELETE /api/stores/:id` - Delete a store (owner only)

### Table Endpoints
- `GET /api/stores/:storeId/tables` - Get all tables for a store
- `POST /api/stores/:storeId/tables` - Add a table to a store (owner only)
- `PUT /api/tables/:id` - Update a table (owner only)
- `DELETE /api/tables/:id` - Delete a table (owner only)

### Booking Endpoints
- `GET /api/bookings` - Get all bookings (filtered by user role)
- `GET /api/bookings/:id` - Get a specific booking
- `POST /api/bookings` - Create a new booking
- `PUT /api/bookings/:id` - Update a booking (owner or booking creator)
- `DELETE /api/bookings/:id` - Cancel a booking (owner or booking creator)

## Testing

Run tests with:
```
npm test
```

