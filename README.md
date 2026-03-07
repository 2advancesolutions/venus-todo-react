# Venus Todo App

A modern, responsive React todo application built with TypeScript and Tailwind CSS.

## Features

- ✅ **Add Todos**: Create new todo items with a clean input form
- ✅ **Update Todos**: Edit existing todo items inline
- ✅ **Delete Todos**: Remove completed or unwanted items
- ✅ **Toggle Complete**: Mark todos as complete/incomplete
- ✅ **Responsive Design**: Works perfectly on desktop and mobile
- ✅ **Modern UI**: Beautiful gradient background and clean card-based layout
- ✅ **Real-time Stats**: Track your progress with completion counter

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **ESM** modules throughout

## Getting Started

### Prerequisites

- Node.js 16 or higher
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

4. Open your browser to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Usage

1. **Adding a Todo**: Type your todo in the input field and click "Add Todo" or press Enter
2. **Completing a Todo**: Click the checkbox next to any todo to mark it as complete
3. **Editing a Todo**: Click the "Edit" button to modify the text, then "Save" or press Enter to confirm
4. **Deleting a Todo**: Click the "Delete" button to remove a todo permanently

## Project Structure

```
src/
├── components/          # React components
│   ├── TodoForm.tsx    # Form for adding new todos
│   ├── TodoItem.tsx    # Individual todo item with edit/delete
│   ├── TodoList.tsx    # Container for todo items
│   └── TodoInput.tsx   # Reusable input component
├── types/
│   └── todo.ts         # TypeScript interfaces
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles and Tailwind imports
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

Built with ❤️ by Venus AI