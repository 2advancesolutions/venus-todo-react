# Venus Todo React

A beautiful, functional todo application built with React and TypeScript. Features include adding, updating, deleting, and toggling tasks with persistent storage.

## Features

- ✅ Add new tasks
- ✅ Edit existing tasks
- ✅ Delete tasks
- ✅ Mark tasks as complete/incomplete
- ✅ Persistent storage using localStorage
- ✅ Responsive design
- ✅ Clean, modern UI
- ✅ Double-click to edit
- ✅ Keyboard shortcuts (Enter to save, Escape to cancel)

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **CSS** for styling
- **Local Storage** for data persistence

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

1. **Add a task**: Type your task in the input field and click "Add Task" or press Enter
2. **Complete a task**: Click the checkbox next to any task
3. **Edit a task**: Click the "Edit" button or double-click the task text
4. **Save changes**: Click "Save" or press Enter while editing
5. **Cancel editing**: Click "Cancel" or press Escape
6. **Delete a task**: Click the "Delete" button

## Project Structure

```
src/
├── components/          # React components
│   ├── TodoForm.tsx   # Task input form
│   ├── TodoItem.tsx   # Individual todo item
│   └── TodoList.tsx   # List of todos
├── hooks/              # Custom React hooks
│   └── useTodos.ts    # Todo state management
├── types/              # TypeScript type definitions
│   └── todo.ts        # Todo interface
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles
```

## Development

The project uses:
- **Functional components** with React hooks
- **TypeScript** for type safety
- **CSS** for styling with responsive design
- **Local storage** for data persistence
- **ESM** modules for modern JavaScript

## License

MIT License - feel free to use this project as a starting point for your own applications!