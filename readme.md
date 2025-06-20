# 📚 Library Management API

A robust Library Management System built using **Express**, **TypeScript**, and **MongoDB**. It allows for book CRUD operations and borrowing logic with validation, filtering, and aggregation capabilities.

## 📦 Tech Stack

- **Node.js** & **Express.js**
- **TypeScript**
- **MongoDB** & **Mongoose**
- **Dotenv**
- **ESLint** + **Prettier** (optional for code quality)

---

## 🚀 Features

- Add, retrieve, update, and delete books
- Borrow books with business logic enforcement
- Aggregation-based borrow summary
- Filtering, sorting, and pagination support
- Robust error handling middleware
- Mongoose static method + post middleware
- Environment variable support via `.env`

---

## 📁 Project Structure

src/
│
├── controllers/
│ ├── book.controller.ts
│ └── borrow.controller.ts
├── models/
│ ├── book.model.ts
│ └── borrow.model.ts
├── routes/
│ ├── book.routes.ts
│ └── borrow.routes.ts
├── middleware/
│ └── errorHandler.ts
├── config/
│ └── db.ts
├── server.ts
├── app.ts
└── ...

---

## 🛠️ Setup Instructions

1. **Clone the repository**

```bash
git clone https://github.com/MD-SelimReza/Next-Dev-Assignment3.git
cd library-management-api
```

2. **Install dependencies**

```bash
npm install
```

3. **Create a `.env` file**

```bash
PORT=5000
MONGODB_URI=mongodb://localhost:27017/library_db
```

4. **Run the app**

```bash
npm run dev
```

The API will be running at `http://localhost:5000`.

---

## 🔗 API Endpoints

### 📘 Book Endpoints

### 1\. Create Book

**POST** `/api/books`

#### Request:

```json
{
  "title": "The Theory of Everything",
  "author": "Stephen Hawking",
  "genre": "SCIENCE",
  "isbn": "9780553380163",
  "description": "An overview of cosmology and black holes.",
  "copies": 5,
  "available": true
}
```

---

### 2\. Get All Books

**GET** `/api/books`

Supports filtering, and sorting.

#### Example Query:

`/api/books?filter=FANTASY&sortBy=createdAt&sort=desc&limit=5`

---

### 3\. Get Book by ID

**GET** `/api/books/:bookId`

### 4\. Update Book

**PUT** `/api/books/:bookId`

#### Request:

```json
{
  "copies": 50
}
```

---

### 5\. Delete Book

**DELETE** `/api/books/:bookId`

#### Response:

```json
{
  "success": true,
  "message": "Book deleted successfully",
  "data": null
}
```

## 📗 Borrow Endpoints

### 1\. Borrow a Book

**POST** `/api/borrow`

#### Request:

```json
{
  "book": "64ab3f9e2a4b5c6d7e8f9012",
  "quantity": 2,
  "dueDate": "2025-07-18T00:00:00.000Z"
}
```

---

### 2\. Borrow Books Summary

`GET /api/borrow`

### Returns:

```json
{
  "success": true,
  "message": "Borrowed books summary retrieved successfully",
  "data": [
    {
      "book": {
        "title": "The Theory of Everything",
        "isbn": "9780553380163"
      },
      "totalQuantity": 5
    }
  ]
}
```

---

## 📽️ Video Explanation

A short video walkthrough demonstrates:

- Project architecture

- Schema validation

- Business logic (availability + borrowing)

- Aggregation with borrow summary

- Filtering and error handling

🧠 **See `/docs/demo.mp4`**.

---

## ✨ Quality Features

✅ Clean code structure

✅ Middleware abstraction

✅ Aggregation pipeline usage

✅ Response formatting

✅ Meaningful variable naming

---

## 🤝 Contributing

Contributions welcome! Please open issues or PRs for improvements.

---
