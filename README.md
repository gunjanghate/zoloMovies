# 🎬 zoloMovies

**Your go-to place for managing and discovering movies!**

zoloMovies is a full-stack movie management web application built with **Next.js** for both frontend and backend, and **MongoDB** as the database. It provides a clean interface to perform all CRUD operations (Create, Read, Update, Delete) for movie records.

---

## 🚀 Features

- ✅ Add new movies with details like title, genre, release year, etc.
- 🗑️ Delete movies from the database.
- 📄 View a list of all added movies.
- 🔍 Search, Filter for any movie.
- 🎯 Intuitive UI for smooth user experience.

---

## 🧑‍💻 Tech Stack

| Layer       | Tech Used          |
|-------------|--------------------|
| Frontend    | Next.js, React     |
| Backend     | API Routes (Next.js) |
| Database    | MongoDB + Mongoose |
| Styling     | Tailwind CSS       |

---

## 📸 Screenshot

![zoloMovies UI](./public/zolomovies.png)

---

## 🛠️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/gunjanghate/zoloMovies.git
cd zoloMovies
2. Install dependencies
bash
Copy
Edit
npm install
3. Set up environment variables
Create a .env.local file in the root directory and add your MongoDB connection string:

env
Copy
Edit
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/zolomovies?retryWrites=true&w=majority
💡 Make sure your IP is whitelisted in your MongoDB Atlas project settings.

4. Run the development server
bash
Copy
Edit
npm run dev
Visit http://localhost:3000 in your browser.

✍️ Folder Structure
bash
Copy
Edit
zoloMovies/
│
├── pages/
│   ├── index.js         # Homepage
│   ├── movies/          # Movies CRUD pages
│   └── api/             # Backend API routes
│
├── models/              # Mongoose schemas
├── utils/               # DB connection helper
├── public/              # Static assets
└── styles/              # Tailwind / global CSS
📌 Future Enhancements (Ideas)
🔍 Add search & filter functionality.

⭐ Movie rating system.

📦 Deploy to Vercel with environment management.

🛡️ Auth (JWT or OAuth) for admin-level access.

