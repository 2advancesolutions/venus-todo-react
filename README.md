# Venus Todo React App

A modern, responsive todo application built with React, TypeScript, and Tailwind CSS. Features full CRUD operations with a clean and intuitive interface.

## Features

- ✅ **Add Todos**: Create new todo items with a simple form
- ✅ **Update Todos**: Edit existing todo text inline
- ✅ **Delete Todos**: Remove todos with confirmation
- ✅ **Toggle Complete**: Mark todos as complete/incomplete
- ✅ **Responsive Design**: Works on desktop and mobile
- ✅ **Modern UI**: Clean, minimalist design with Tailwind CSS

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **ESLint** for code quality

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd venus-todo-react
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Usage

1. **Adding a Todo**: Type your task in the input field and click "Add" or press Enter
2. **Editing a Todo**: Click the "Edit" button next to any todo, modify the text, then click "Save" or press Enter
3. **Completing a Todo**: Click the checkbox to mark a todo as complete/incomplete
4. **Deleting a Todo**: Click the "Delete" button to remove a todo

## Project Structure

```
src/
├── components/
│   ├── TodoForm.tsx      # Form for adding new todos
│   ├── TodoItem.tsx      # Individual todo item with edit/delete
│   ├── TodoList.tsx      # Container for all todo items
│   └── TodoInput.tsx     # Alternative input component
├── types/
│   └── todo.ts           # TypeScript interfaces
├── App.tsx               # Main application component
├── main.tsx             # Application entry point
└── index.css            # Global styles
```

## Development

The project uses:
- **TypeScript** for type safety
- **ESLint** for code linting
- **Vite** for fast HMR and optimized builds
- **Tailwind CSS** for utility-first styling

## License

MIT License - feel free to use this project as a starting point for your own applications!