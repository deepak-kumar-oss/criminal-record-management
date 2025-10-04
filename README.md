# criminal-record-management

# ⛓️ Inmate Database - MERN Stack

A full-stack web application for managing criminal records, built with the MERN stack (MongoDB, Express, React, Node.js). The application features a secure login system for "Wardens" and provides full CRUD (Create, Read, Update, Delete) functionality for inmate records.

## ✨ Features

* **Secure Authentication:** Warden registration and login system using JWT (JSON Web Tokens).
* **CRUD Operations:** Full capabilities to Create, Read, Update, and Delete inmate records.
* **Real-time Search:** Instantly search and filter inmate records by name on the frontend.
* **Themed UI:** A responsive, jail-themed user interface built with **Tailwind CSS**.
* **Password Security:** Passwords are securely hashed using `bcryptjs` before being stored.

---

## 📚 Tech Stack

* **Backend:**
    * **Node.js:** JavaScript runtime environment.
    * **Express:** Web framework for Node.js.
    * **MongoDB:** NoSQL database for storing data.
    * **Mongoose:** Object Data Modeling (ODM) library for MongoDB.
    * **JWT:** For secure user authentication.
    * **Bcrypt.js:** For password hashing.
* **Frontend:**
    * **React:** JavaScript library for building user interfaces.
    * **Vite:** Fast frontend build tool.
    * **Tailwind CSS:** Utility-first CSS framework for styling.
    * **React Router:** For client-side routing.
    * **Axios:** For making API requests to the backend.

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

Make sure you have the following software installed on your computer:
* **Node.js** (which includes npm): [Download Node.js](https://nodejs.org/)
* **MongoDB:** You'll need a MongoDB database. You can install it locally or use a free cloud service like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

### 🔧 Installation & Setup

**1. Clone the Repository**
```bash
git clone <your-repository-url>
cd <your-project-directory>
```

**2. Backend Setup**
```bash
# Navigate to the backend folder (assuming it's named 'backend')
cd backend

# Install dependencies
npm install

# Create a .env file in the 'backend' root directory
touch .env
```
Now, open the `.env` file and add the following environment variables. **Generate your own unique JWT_SECRET.**
```env
# .env.example
MONGO_URI=your_mongodb_connection_string_here
JWT_SECRET=your_super_secure_random_string_here
```

**3. Frontend Setup**
```bash
# Navigate to the frontend folder (assuming it's named 'frontend' or 'criminal-records-ui')
cd ../frontend

# Install dependencies
npm install
```

### ▶️ Running the Application

You'll need to run both the backend and frontend servers simultaneously in two separate terminal windows.

* **Terminal 1: Start the Backend Server**
    ```bash
    # In the /backend directory
    npm run dev
    ```
    Your backend server should now be running on `http://localhost:3000`.

* **Terminal 2: Start the Frontend Development Server**
    ```bash
    # In the /frontend directory
    npm run dev
    ```
    Your React application should now be running and accessible at `http://localhost:5173` (or another port if 5173 is in use).

Open your browser to the frontend URL to use the application!

---

## 📝 API Endpoints

The backend exposes the following REST API endpoints:

| Method | Endpoint                    | Description                          |
| :----- | :-------------------------- | :----------------------------------- |
| `POST` | `/api/jailer/signup`        | Register a new Warden.               |
| `POST` | `/api/jailer/login`         | Log in a Warden and get a JWT.       |
| `GET`  | `/api/criminal/get`         | Get all inmate records.              |
| `POST` | `/api/criminal/create`      | Create a new inmate record.          |
| `PUT`  | `/api/criminal/update/:id`  | Update an existing inmate record.    |
| `DELETE`| `/api/criminal/delete/:id`  | Delete an inmate record.             |

