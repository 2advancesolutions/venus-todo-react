# Venus Todo React

A modern, responsive todo application built with React 19, TypeScript, and Tailwind CSS.

## Features

- ✅ Add new todos
- ✅ Edit existing todos (double-click to edit)
- ✅ Mark todos as complete/incomplete
- ✅ Delete todos
- ✅ Local storage persistence
- ✅ Responsive design
- ✅ Clean, modern UI

## Tech Stack

- **React 19** - Latest React with new features
- **TypeScript** - Type safety
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first CSS
- **Local Storage** - Data persistence

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd venus-todo-react
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser to `http://localhost:5173`

## Usage

1. **Add a todo**: Type in the input field and press Enter or click "Add Todo"
2. **Complete a todo**: Click the checkbox next to any todo
3. **Edit a todo**: Double-click on the todo text to enter edit mode
4. **Save an edit**: Press Enter or click "Save" while editing
5. **Cancel an edit**: Press Escape or click "Cancel" while editing
6. **Delete a todo**: Click the "Delete" button

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Project Structure

```
src/
├── components/          # React components
│   ├── TodoInput.tsx   # Todo input form
│   ├── TodoItem.tsx    # Individual todo item
│   └── TodoList.tsx    # Todo list container
├── types/              # TypeScript types
│   └── todo.ts        # Todo interface
├── App.tsx            # Main app component
├── main.tsx           # App entry point
└── index.css          # Global styles
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - see LICENSE file for details.

---

Built with ❤️ by Venus AI