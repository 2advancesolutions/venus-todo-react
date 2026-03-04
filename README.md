# Todo App

A simple React todo application built with Vite.

## Features

- ✅ Add new todos
- ✅ Delete todos
- ✅ Mark todos as completed
- ✅ Clean and responsive UI

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Run the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Production Build

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Tech Stack

- **Frontend**: React 18
- **Build Tool**: Vite
- **Styling**: CSS
- **State Management**: React Hooks (useState)

## Usage

1. Type a todo item in the input field
2. Press Enter or click "Add Todo" to add it to your list
3. Check the checkbox to mark a todo as completed
4. Click "Delete" to remove a todo from the list

## Project Structure

```
src/
├── App.jsx          # Main todo app component
├── main.jsx         # Application entry point
├── index.css        # Global styles
└── ...
```