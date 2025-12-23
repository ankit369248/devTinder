# 🚀 DevTinder – Backend API

DevTinder is a backend platform built using **Node.js, Express, and MongoDB**, designed to help developers connect, collaborate, and interact securely.
This project focuses on **real-world backend engineering concepts** such as authentication, authorization, schema-level validations, and secure API design.

---

## ✨ Key Highlights

- Secure authentication using **JWT + HTTP-only cookies**
- Password encryption using **bcrypt**
- Strong schema-level validations with **Mongoose + validator**
- Clean separation of concerns (models, middleware, utils)
- Production-style backend practices

---

## 🚀 Features

- User Registration (Signup)
- User Login with JWT authentication
- Protected routes using auth middleware
- Full CRUD operations on users
- MongoDB + Mongoose schema validations
- Email, name, password, gender & URL validation
- Secure password storage (bcrypt hashing)
- Schema methods for JWT creation & password verification
- Allowed-fields based secure update system
- Environment variable support using dotenv
- Development auto-reload using nodemon

---

## 🛠 Tech Stack

| Technology     | Purpose                          |
| -------------- | -------------------------------- |
| **Node.js**    | JavaScript runtime               |
| **Express.js** | REST API framework               |
| **MongoDB**    | NoSQL database                   |
| **Mongoose**   | ODM for MongoDB                  |
| **JWT**        | Authentication & authorization   |
| **bcrypt**     | Password hashing & verification  |
| **validator**  | Email, password & URL validation |
| **dotenv**     | Environment variable management  |
| **nodemon**    | Development auto-reload          |

---

## 📁 Folder Structure

```
devTinder/
│
├── src/
│   ├── config/
│   │   └── database.js
│   ├── middlewares/
│   │   └── auth.js
│   ├── models/
│   │   └── user.js
│   ├── utils/
│   │   └── validation.js
│   └── app.js
│
├── .env
├── .gitignore
├── package.json
├── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/ankit369248/devTinder.git
cd devTinder
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Configure environment variables

Create a `.env` file in the root directory:

```
PORT=7777
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 4️⃣ Start the server

**Development mode (with auto-reload):**

```bash
npm run dev
```

**Production mode:**

```bash
npm start
```

Server will run on:

```
http://localhost:7777
```

---

## 📡 API Endpoints

### 🔐 Authentication

- **POST** `/signup` → Register a new user
- **POST** `/login` → Login user & issue JWT (cookie-based)
- **GET** `/profile` → Get logged-in user profile (protected)

### 👥 User APIs

- **GET** `/feed` → Fetch all users
- **GET** `/userOne/:emailId` → Get user by email
- **PATCH** `/user/:userId` → Update user by ID
- **DELETE** `/user` → Delete user by email

---

## 🔍 Validations Implemented

- First & Last Name → Alphabets only
- Email → Validated using `validator.isEmail()`
- Password → Strong password validation
- Password Storage → Hashed using bcrypt
- Photo URL → Must be a valid URL
- Gender → `male | female | others`
- Skills → Maximum 10 skills allowed
- Email → Auto-trimmed & lowercased
- Timestamps → Automatically maintained

---

## 🔐 Authentication Flow

1. User logs in with email & password
2. Password verified using bcrypt
3. JWT generated using schema method
4. JWT stored in **HTTP-only cookie**
5. Protected routes validated via auth middleware
6. Logged-in user context attached to request

---

## 🔮 Future Enhancements

- Logout API
- Refresh token mechanism
- Role-based access control (Admin/User)
- Pagination & sorting in `/feed`
- Request validation using Joi / Zod
- Profile image upload
- React frontend integration

---

## 🤝 Contributing

Contributions, suggestions, and improvements are welcome.
Feel free to fork the repository and raise a PR.

---

## 📜 License

ISC License
