# React Todo App

A modern, responsive todo application built with React 19, TypeScript, and Tailwind CSS.

## Features

- ✅ **Add Todos**: Create new todo items with a clean input interface
- ✅ **Edit Todos**: Click on any todo text to edit it inline
- ✅ **Delete Todos**: Remove todos with a simple delete button
- ✅ **Toggle Complete**: Mark todos as complete/incomplete
- ✅ **Filter Todos**: View all, active, or completed todos
- ✅ **Clear Completed**: Remove all completed todos at once
- ✅ **Local Storage**: Todos persist between browser sessions
- ✅ **Responsive Design**: Works great on desktop and mobile

## Tech Stack

- **React 19** - Latest React with new hooks and features
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool and dev server
- **Local Storage** - Browser-based persistence

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
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

1. **Adding a Todo**: Type your todo in the input field and press Enter
2. **Editing a Todo**: Click on any todo text to edit it inline
3. **Completing a Todo**: Click the checkbox to mark as complete/incomplete
4. **Deleting a Todo**: Click the "Delete" button on any todo
5. **Filtering**: Use the filter buttons to view All, Active, or Completed todos
6. **Clear Completed**: Click "Clear Completed" to remove all completed todos

## Project Structure

```
src/
├── components/
│   ├── TodoForm.tsx      # Main form with filters and actions
│   ├── TodoInput.tsx     # Input component for adding todos
│   ├── TodoItem.tsx      # Individual todo item with edit/delete
│   └── TodoList.tsx      # List of todo items
├── types/
│   └── todo.ts          # TypeScript type definitions
├── App.tsx              # Main application component
├── main.tsx             # Application entry point
└── index.css            # Global styles
```

## Development

This project uses:
- **React 19** with functional components and hooks
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Vite** for fast development and building
- **Local Storage** for data persistence

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - feel free to use this project for learning or as a starting point for your own applications.