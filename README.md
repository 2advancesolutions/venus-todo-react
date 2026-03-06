# Venus Todo React

A polished drag-and-drop todo board built with React (Vite) showcasing add, edit, delete, and completion workflows.

## Features

- ✍️ **Create** new todos with a single input form.
- 📝 **Inline editing** — double-click or use the edit action to update a task.
- 🗑️ **Delete** tasks instantly.
- ✅ **Drag & drop to complete** — move todos between _In Progress_ and _Completed_ columns.
- 💡 Keyboard-friendly actions and subtle UI polish (focus states, hover feedback).

## Getting Started

```bash
npm install
npm run dev
```

The app runs at [http://localhost:5173](http://localhost:5173) using Vite's development server.

### Production Build

```bash
npm run build
npm run preview
```

## Project Structure

```
.
├── index.html
├── package.json
├── src
│   ├── App.css
│   ├── App.jsx
│   ├── components
│   │   ├── TodoForm.jsx
│   │   ├── TodoItem.jsx
│   │   └── TodoSection.jsx
│   ├── main.jsx
│   └── styles.css
└── vite.config.js
```

## Notes

- The project uses functional React components and hooks.
- Todos are seeded with sample data for quick exploration; feel free to remove or adjust.
- Drag-and-drop behavior relies on the HTML5 API — no external libraries required.

Enjoy organizing your tasks! 🎯
