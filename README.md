# DevTinder – Backend API

DevTinder is a backend platform built using Node.js, Express, and MongoDB that allows developers to connect, collaborate, and work together.  
This project is part of my learning journey toward mastering backend development, Node.js, and real-world API design.

---

## 🚀 Features

- User Registration (Signup)
- Full CRUD operations on users
- MongoDB + Mongoose schema validations
- Email, name, and gender validation
- Clean timestamp formatting
- Modular & scalable folder structure
- Environment variable support using dotenv
- Nodemon for development mode auto-reload
- Strong password validation
- URL validation for profile images
- Secure update system with allowed-fields rules
- using bcrypt hashed password is stored in db

---

## 🛠 Tech Stack

| Technology     | Purpose                                |
| -------------- | -------------------------------------- |
| **Node.js**    | JavaScript runtime                     |
| **Express.js** | Web framework for APIs                 |
| **MongoDB**    | NoSQL database                         |
| **Mongoose**   | ODM for MongoDB                        |
| **dotenv**     | Environment configuration              |
| **nodemon**    | Auto-restart in development            |
| **validator**  | For email, password & URL validation   |
| **bcrypt**     | For password enctyption and decryption |

---

## 📁 Folder Structure

```
devTinder/
│
├── src/
│ ├── config/
│ │ └── database.js
│ ├── middlewares/
│ │ └── auth.js
│ ├── models/
│ │ └── user.js
│ ├── utils/
│ │ └── validation.js
│ └── app.js
│
├── .env
├── package.json
├── README.md
├── .gitignore

```

---

## ⚙️ Installation & Setup

### 1. Clone the repository

git clone https://github.com/ankit369248/devTinder.git
cd devTinder

### 2. Install dependencies

npm install

### 3. Configure environment variables

Create a .env file:
PORT=7777
MONGO_URI=your_mongodb_connection_string

### 4. Start the server

Development mode (auto reload):
npm run dev

Normal mode:
npm start

Server runs at:
http://localhost:7777

---

## 📡 API Endpoints

🔹 POST /signup — Create a new user  
🔹 POST /login — Existing user login  
🔹 GET /user — Get user by email from request body  
🔹 GET /userOne/:emailId — Get user using emailId from route param
🔹 GET /feed — Get all users  
🔹 PATCH /user/:userId — Update user by userId
🔹 DELETE /user — Delete user

---

## 🔍 Validations

- First/Last Name → alphabets only
- Email → validated using validator.isEmail()
- Password → checked using validator.isStrongPassword()
- Photo URL → must be a valid URL
- Gender → male / female / others only
- Skills → max 10 items
- Auto-trimmed + lowercase email
- Timestamps cleaned & formatted
- Password → with bcrypt allwing valid user login only

---

## 🔮 Future Enhancements

- Login API
- JWT authentication
- Password hashing with bcrypt
- Profile image upload
- Pagination & sorting in /feed
- Request validation via Joi or Zod
- React frontend

---

## 🤝 Contributing

Suggestions and improvements are welcome!

---

## 📜 License

ISC License
