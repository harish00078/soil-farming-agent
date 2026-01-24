# Soil Farming Agent 🚀

**GitHub Link:** [student-teacher-appointment](https://github.com/harish00078/student-teacher-appointment/blob/main/README.md)

**Soil Farming Agent** is a modern, full-stack agricultural management platform designed to bridge the gap between soil science and practical farming. It combines a robust MERN backend with a high-performance React frontend, featuring immersive 3D visualizations and seamless role-based access control.

![React](https://img.shields.io/badge/React-18-blue) ![Node.js](https://img.shields.io/badge/Node.js-LTS-green) ![Express.js](https://img.shields.io/badge/Express-4.x-lightgrey) ![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green) ![Three.js](https://img.shields.io/badge/Three.js-3D-black) ![JWT](https://img.shields.io/badge/JWT-Secure-orange)

## ✨ Key Features

* **🛡️ Secure Admin Dashboard**: Full CRUD capabilities for managing soil types, compatible crops, and distributor data.
* **🌐 3D Immersive UI**: Features a dynamic, interactive 3D background powered by **React Three Fiber** and **Drei**.
* **🔐 Advanced Authentication**: Role-Based Access Control (RBAC) ensuring only authorized admins can modify critical agricultural data.
* **🚚 Distributor Integration**: Connects soil types with local suppliers, providing contact details and locations for farmers.
* **🌾 Agricultural Intelligence**: Detailed soil profiles including pH levels, nutrient descriptions, and optimized crop suggestions.
* **⚡ Real-time Feedback**: Fluid UI transitions and interactive elements powered by **Framer Motion**.

## 🛠️ Tech Stack

* **Frontend**: React 18, React Three Fiber, Framer Motion, Axios
* **Backend**: Node.js, Express.js
* **Database**: MongoDB (Mongoose ODM)
* **Security**: JSON Web Tokens (JWT), Bcrypt.js
* **Logging**: Winston
* **Testing**: Jest, Supertest

## 🚀 Getting Started

### Prerequisites

* Node.js (v16 or higher)
* MongoDB (Local or Atlas)
* npm or yarn

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/harish00078/student-teacher-appointment
    cd soil-farming-agent
    ```

2.  **Backend Setup**
    ```bash
    cd backend
    npm install
    ```
    Create a `.env` file in the `backend` folder:
    ```env
    PORT=5000
    MONGO_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    ADMIN_EMAIL=admin@example.com
    ADMIN_PASSWORD=admin123
    ```
    Seed the database with sample data:
    ```bash
    npm run seed
    ```

3.  **Frontend Setup**
    ```bash
    cd ../frontend
    npm install
    npm start
    ```

## 🔐 Admin Credentials (Default)

| Field    | Value               |
| :------- | :------------------ |
| **Email**    | `boss123@gmail.com` |
| **Password** | `BOSS007bond`       |

## 📁 Project Structure

```text
soil-farming-agent/
├── backend/
│   ├── controllers/    # Business logic for Auth, Soils, & Distributors
│   ├── models/         # Mongoose Schemas (User, Soil, Distributor)
│   ├── routes/         # API Endpoints
│   ├── middleware/     # Auth & Admin validation
│   └── tests/          # Jest Integration Tests
└── frontend/
    ├── src/
    │   ├── components/ # 3D Background, Navbar, ErrorBoundaries
    │   ├── pages/      # Login, Register, SoilList, DistributorList
    │   └── services/   # Axios API configurations
```

## 📡 API Overview

* `POST /api/auth/login` - Secure login for Users & Admins
* `GET /api/soils` - Fetch detailed soil database
* `POST /api/soils` - Add new soil profiles (**Admin Only**)
* `GET /api/distributors` - List agricultural suppliers

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.
