# Soil Farming Agent - Project Documentation

**GitHub Link:** [student-teacher-appointment](https://github.com/harish00078/student-teacher-appointment/blob/main/README.md)

## 📖 Overview
**Soil Farming Agent** is a full-stack MERN (MongoDB, Express, React, Node.js) application designed to assist in agricultural management. It allows users to browse different soil types, check crop compatibility, and find local distributors. The application also features a secure Admin panel for managing soil and distributor data.

---

## 🛠 Tech Stack

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (with Mongoose)
- **Authentication:** JSON Web Tokens (JWT) & bcryptjs
- **Logging:** Winston
- **Testing:** Jest & Supertest

### Frontend
- **Framework:** React.js
- **Styling:** CSS / Framer Motion (Animations)
- **3D Visuals:** React Three Fiber (@react-three/fiber) & Drei
- **HTTP Client:** Axios

---

## 📂 Project Structure

```bash
soil-farming-agent/
├── backend/                # Server-side logic
│   ├── config/             # Database connection
│   ├── controllers/        # Route logic (Auth, Soil, Distributor)
│   ├── middleware/         # Auth & Admin verification
│   ├── models/             # Mongoose Schemas
│   ├── routes/             # API Endpoints
│   ├── tests/              # Backend Unit/Integration Tests
│   ├── seed.js             # Database seeding script
│   └── server.js           # Entry point
│
└── frontend/               # Client-side application
    ├── src/
    │   ├── components/     # Reusable UI components
    │   ├── pages/          # Application views/routes
    │   └── services/       # API integration
    └── public/             # Static assets
```

---

## 🚀 Installation & Setup

### 1. Prerequisites
- Node.js (v14+ recommended)
- MongoDB (Running locally or a cloud URI)

### 2. Backend Setup
Navigate to the `backend` folder and install dependencies:
```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory with the following configuration:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/soil_farming_db
JWT_SECRET=your_super_secret_key_change_this
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin123
```
*Note: `ADMIN_PASSWORD` is required to seed the initial admin account.*

Seed the database (creates Admin user and sample data):
```bash
npm run seed
```

Start the backend server:
```bash
npm run dev
```
The server should run on `http://localhost:5000`.

### 3. Frontend Setup
Open a new terminal, navigate to the `frontend` folder, and install dependencies:
```bash
cd frontend
npm install
```

Start the React application:
```bash
npm start
```
The application will open at `http://localhost:3000`.

---

## 🔐 Admin Credentials

The application supports Role-Based Access Control (RBAC). The **Admin** role has exclusive permissions to Create, Update, and Delete Soil and Distributor data.

If you followed the setup above and ran `npm run seed`, your default Admin account is:

| Field    | Value               |
| :------- | :------------------ |
| **Email**    | `admin@example.com` |
| **Password** | `admin123`          |

> **Note:** The password is determined by the `ADMIN_PASSWORD` environment variable you set in the `backend/.env` file before running the seed script.

---

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and receive JWT

### Soil Management
- `GET /api/soils` - Get all soils
- `GET /api/soils/:id` - Get soil details
- `POST /api/soils` - Add new soil (**Admin only**)
- `PUT /api/soils/:id` - Update soil (**Admin only**)
- `DELETE /api/soils/:id` - Delete soil (**Admin only**)

### Distributors
- `GET /api/distributors` - Get all distributors
- `POST /api/distributors` - Add distributor (**Admin only**)
- `DELETE /api/distributors/:id` - Remove distributor (**Admin only**)

---

## 🧪 Testing

The backend includes a suite of integration tests.

To run tests:
```bash
cd backend
npm test
```
This will run Jest tests located in `backend/tests/`.
