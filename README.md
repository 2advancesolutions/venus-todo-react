# Venus Todo React

A polished React-based todo application that supports adding, editing, deleting, and drag-and-drop completion of tasks.

## Features

- **Create** new todos with a quick inline form
- **Update** existing tasks using inline editing
- **Delete** tasks you no longer need
- **Drag & drop** tasks between Active and Completed columns to change their status
- **Toggle** completion with a checkbox and keep tasks in sync across columns
- **Local storage** persistence so your list survives page refreshes

## Getting started

```bash
npm install
npm run dev
```

Visit the printed URL (typically `http://localhost:5173`) to use the app.

## Available scripts

- `npm run dev` – start the Vite development server
- `npm run build` – create a production build
- `npm run preview` – preview the production build locally after building

## Project structure

```
.
├── index.html
├── package.json
├── src
│   ├── App.jsx
│   ├── main.jsx
│   └── styles.css
└── vite.config.js
```

## Notes

This project was scaffolded manually for the Venus demo environment without relying on global scaffolding tools.
