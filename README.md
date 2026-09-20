# 🛒 Ecommerce Backend API

A RESTful E-commerce Backend API built with **Node.js, Express.js, MongoDB, and Mongoose**.

This project provides the backend infrastructure for an e-commerce application, including user authentication, product management, product reviews, search/filtering, pagination, top-rated products,shopping-cart functionality, order-related workflows,payment gateway integration using PayPal and secure API access using JWT.

🔗 **Repository:** https://github.com/Mohit123singh/Ecommerce-Backend-Api

🌐 **Live API:** https://ecommerce-backend-api-r4ka.onrender.com/

---

## 🚀 Features

- 🔐 User authentication using **JWT**
- 🔑 Password hashing using **bcryptjs**
- 👤 Admin User management and protected routes
- 🛍️ Admin Product management with            **pagination** and **search/filtering by name**
- ⭐ **User Reviews and Ratings system** (Create review per user)
- 🔥 **Top Rated Products** selection based on average ratings
- 🛒 Shopping cart functionality
- 📦 E-commerce order management by Admin
- 💳 **PayPal Payment Integration** for secure checkout
- 🖼️ File/image upload handling using **Multer**
- 🍪 Cookie-based request handling using **cookie-parser**
- 🗄️ MongoDB database integration using **Mongoose**
- ⚡ Async request handling with `express-async-handler`
- 🌱 Database seeding for development
- 🌍 RESTful API architecture
- 🔒 Environment-based configuration using `.env`

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **Node.js** | JavaScript runtime |
| **Express.js** | REST API framework |
| **MongoDB** | NoSQL database |
| **Mongoose** | MongoDB ODM |
| **JWT** | Authentication & authorization |
| **bcryptjs** | Password hashing |
| **PayPal SDK / API** | Online payment processing |
| **Multer** | File upload handling |
| **Cookie Parser** | Cookie handling |
| **dotenv** | Environment configuration |
| **Nodemon** | Development server |

---

## 🏗️ Architecture

```text
Client
   │
   ▼
Express.js REST API
   │
   ├── Authentication
   │       └── JWT
   │
   ├── User Management
   │
   ├── Product Management
   │
   ├── Cart Management
   │
   └── Order & Payment Management
           └── PayPal Integration
   │
   ▼
Mongoose
   │
   ▼
MongoDB
```

---

## 📁 Project Structure

```text
Ecommerce-Backend-Api/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── server.js
│   └── seeder.js
│
├── example.env
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

> The exact contents of individual backend directories may evolve as the project develops.

---

## ⚙️ Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm
- MongoDB or a MongoDB Atlas database
- Git
- PayPal Developer Account (for API Client ID)

---

### 1. Clone the repository

```bash
git clone https://github.com/Mohit123singh/Ecommerce-Backend-Api.git

cd Ecommerce-Backend-Api
```

---

### 2. Install dependencies

```bash
npm install
```

---

### 3. Configure environment variables

Create a `.env` file in the project root.

You can use the provided `example.env` as a reference.

```bash
cp example.env .env
```

Then configure your database connection, JWT secret, port, and other required environment variables.

Example:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

> Do not commit your `.env` file or expose your database credentials and JWT secrets publicly.

---

## ▶️ Running the Application

### Development

Run the server with Nodemon:

```bash
npm run server
```

The server will automatically restart whenever source files change.

### Production

```bash
npm start
```

---

## 🌱 Database Seeding

The project includes scripts for importing and removing seed data.

### Import sample data

```bash
npm run data:import
```

### Destroy sample data

```bash
npm run data:destroy
```

These scripts are useful for quickly preparing a development database with sample data.

---

## 🔐 Authentication

The API uses **JSON Web Tokens (JWT)** for authentication.

Typical authentication flow:

```text
Register
   │
   ▼
Login
   │
   ▼
JWT Token
   │
   ▼
Authenticated Request
   │
   ▼
Protected API Endpoint
```

Passwords are hashed using **bcryptjs** before being stored rather than storing plain-text passwords.

---

## 🛍️ Core API Modules

### Authentication

Responsible for:

- User registration
- User login
- JWT authentication
- Protected API access

### Products

Responsible for:

- Product creation
- Product retrieval
- Product updates
- Product deletion
- Product-related data

### Cart

Responsible for:

- Adding products to cart
- Updating cart items
- Removing products from cart
- Managing user-specific cart data

### Orders

Responsible for:

- Creating orders
- Managing order information
- Retrieving order-related data

---

## 📡 REST API

The application follows REST principles and uses standard HTTP methods:

| Method | Purpose |
|---|---|
| `GET` | Retrieve resources |
| `POST` | Create resources |
| `PUT` / `PATCH` | Update resources |
| `DELETE` | Remove resources |

Protected endpoints require authentication through the application's JWT authentication mechanism.

---

## 🖼️ File Uploads

The backend uses **Multer** to handle multipart/form-data and file uploads.

This allows the API to process product-related images or other uploaded files where required.

---

## 🗄️ Database

The application uses:

**MongoDB + Mongoose**

Mongoose provides:

- Schema definitions
- Data validation
- MongoDB models
- Database queries
- Relationships between application entities

---

## 🧪 Development

The project includes Nodemon for a better development experience.

```bash
npm run server
```

The available npm scripts are:

```bash
npm start
npm run server
npm run data:import
npm run data:destroy
```

---

## 🔒 Security Considerations

The project includes several backend security practices:

- JWT-based authentication
- Password hashing with bcrypt
- Protected API routes
- Environment variables for sensitive configuration
- Cookie parsing for authentication-related requests
- Separation of authentication and application logic

For production deployment, secrets should always be configured through the hosting platform's environment-variable system.

---

## ☁️ Deployment

The API is deployed and publicly accessible through Render:

**Live API**

https://ecommerce-backend-api-r4ka.onrender.com/

---


## 🎯 Project Purpose

This project was built to demonstrate practical backend development skills including:

- REST API development
- Node.js and Express.js
- MongoDB database design
- Authentication and authorization
- JWT-based security
- Password hashing
- File upload handling
- Backend architecture
- Database seeding
- API deployment

---

## 👨‍💻 Author

**Mohit Kumar Singh**

GitHub:  
https://github.com/Mohit123singh

---

## 📄 License

This project is licensed under the **ISC License**.
