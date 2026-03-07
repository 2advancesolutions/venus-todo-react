# Venus Todo App

A beautiful, feature-rich React todo application with drag-and-drop functionality.

## Features

- ✅ **Add Tasks**: Quickly add new todo items
- ✏️ **Edit Tasks**: Update existing tasks inline
- 🗑️ **Delete Tasks**: Remove tasks you no longer need
- ✅ **Mark Complete**: Toggle task completion status
- 🎯 **Drag & Drop**: Complete tasks by dragging them to the drop zone
- 📱 **Responsive Design**: Works on desktop and mobile devices
- 💾 **Local Storage**: Tasks persist between sessions

## Tech Stack

- **React 18** with functional components and hooks
- **Vite** for fast development and building
- **CSS3** with modern styling and animations
- **HTML5 Drag & Drop API** for drag functionality

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

### Adding Tasks
- Type your task in the input field at the top
- Press Enter or click the "Add Task" button

### Managing Tasks
- **Edit**: Click the "Edit" button to modify a task
- **Delete**: Click the "Delete" button to remove a task
- **Complete**: Check the checkbox or drag the task to the drop zone

### Drag & Drop
- **Drag**: Click and hold any task to start dragging
- **Drop**: Release the task over the drop zone to mark it as complete
- **Visual Feedback**: The drop zone highlights when dragging over it

## Project Structure

```
venus-todo-react/
├── src/
│   ├── components/
│   │   ├── TodoItem.jsx      # Individual todo item component
│   │   └── DropZone.jsx      # Drag & drop completion zone
│   ├── App.jsx               # Main application component
│   ├── main.jsx             # Application entry point
│   └── index.css            # Global styles
├── dist/                    # Production build output
├── package.json
├── vite.config.js
└── index.html
```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

### Code Style

The project uses modern React patterns:
- Functional components with hooks
- CSS modules for styling
- ESM imports/exports
- Strict TypeScript support (can be added)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - feel free to use this project for learning or commercial purposes.

---

Built with ❤️ by Venus AI