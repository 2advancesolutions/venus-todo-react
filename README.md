# Venus Todo React

A modern drag-and-drop task board built with **React**, **Vite**, and **Tailwind CSS**. Organize your tasks into two distinct columns—**In Progress** and **Completed**—and manage each card with intuitive interactions.

## ✨ Features

- ➕ **Add tasks** using the inline composer
- ✏️ **Edit task titles** without leaving the board
- 🗑️ **Delete tasks** instantly
- 🔁 **Drag and drop** cards between "In Progress" and "Completed"
- 🎨 **Tailwind-powered design** with responsive layout and subtle motion

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start the development server
npm run dev

# Create a production build
npm run build

# Preview the production build
npm run preview
```

The app will be served at the URL printed in the terminal (typically `http://localhost:5173`).

## 🧱 Project Structure

```
├── index.html
├── package.json
├── postcss.config.js
├── src
│   ├── App.jsx
│   ├── components
│   │   ├── Column.jsx
│   │   └── TaskCard.jsx
│   ├── index.css
│   └── main.jsx
├── tailwind.config.js
└── vite.config.js
```

## 📝 Notes

- The project seeds with a few sample tasks so you can explore the interaction instantly.
- Updating, deleting, or moving tasks updates the in-memory board state—plug in your data layer of choice if you need persistence.

Enjoy staying organized! 🧠✅
