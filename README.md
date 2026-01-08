# Soil Farming Agent

## Project Description
Soil is a crucial component in agriculture. This application allows Admins to update soil information and distributor details, which can then be viewed by Users to understand which crops grow best in which soil types.

## Technologies Used
- **Frontend:** React, Axios
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Tokens)
- **Logging:** Winston
- **Testing:** Jest, Supertest

## Features
- **Admin Module:**
  - Login
  - Post Soil Details
  - Post Distributor Details
- **User Module:**
  - Register / Login
  - View Soil Details
  - View Distributor Details

## Setup & Installation

### Prerequisites
- Node.js (v14 or later)
- MongoDB (Local or Atlas)

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` directory with the following variables:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```
4. Start the server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the application:
   ```bash
   npm start
   ```

## Workflow
1. **Registration:** Users register for an account.
2. **Login:** Users or Admins login to access protected features.
3. **Admin Actions:** Admins can add new soil types and distributor information.
4. **User Actions:** Users can browse the list of available soils and distributors to make informed farming decisions.

## Testing
This project includes integration tests for the backend API.
To run the tests:
```bash
cd backend
npm test
```
**Test Cases Covered:**
- User Registration (Success/Failure)
- User Login (Success/Failure)
