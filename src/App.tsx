import { useState } from 'react'
import TodoList from './components/TodoList'
import TodoInput from './components/TodoInput'

export interface Todo {
  id: number
  text: string
  completed: boolean
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: 'Learn React', completed: true },
    { id: 2, text: 'Build a todo app', completed: false },
    { id: 3, text: 'Master Tailwind CSS', completed: false },
  ])

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      completed: false,
    }
    setTodos([...todos, newTodo])
  }

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const activeTodos = todos.filter((todo) => !todo.completed).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6">
            <h1 className="text-3xl font-bold text-white text-center">
              ✨ Venus Todo App
            </h1>
            <p className="text-purple-100 text-center mt-2">
              {activeTodos} {activeTodos === 1 ? 'task' : 'tasks'} remaining
            </p>
          </div>

          <div className="p-6">
            <TodoInput onAddTodo={addTodo} />
            <TodoList
              todos={todos}
              onToggleTodo={toggleTodo}
              onDeleteTodo={deleteTodo}
            />
          </div>
        </div>

        <footer className="text-center mt-8 text-gray-600">
          <p>Built with React + Vite + Tailwind CSS</p>
          <p className="text-sm mt-1">— Venus 🌟</p>
        </footer>
      </div>
    </div>
  )
}

export default App
