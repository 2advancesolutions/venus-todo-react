import { useState, useEffect } from 'react'
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'
import { Todo } from './types/todo'

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('todos')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        return parsed.map((todo: any) => ({
          ...todo,
          createdAt: new Date(todo.createdAt),
          updatedAt: new Date(todo.updatedAt)
        }))
      } catch {
        return []
      }
    }
    return []
  })

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    setTodos(prev => [...prev, newTodo])
  }

  const updateTodo = (id: string, updates: Partial<Pick<Todo, 'text' | 'completed'>>) => {
    setTodos(prev => 
      prev.map(todo => 
        todo.id === id 
          ? { ...todo, ...updates, updatedAt: new Date() }
          : todo
      )
    )
  }

  const deleteTodo = (id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id))
  }

  const completedCount = todos.filter(todo => todo.completed).length
  const pendingCount = todos.length - completedCount

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Venus Todo</h1>
          <p className="text-gray-600">
            {todos.length > 0 
              ? `${pendingCount} pending, ${completedCount} completed`
              : 'Add your first todo to get started!'
            }
          </p>
        </header>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <TodoInput onAddTodo={addTodo} />
          <TodoList 
            todos={todos} 
            onUpdate={updateTodo} 
            onDelete={deleteTodo} 
          />
        </div>

        {todos.length > 0 && (
          <footer className="text-center mt-6">
            <p className="text-sm text-gray-500">
              Double-click a todo to edit it. Press Enter to save, Escape to cancel.
            </p>
          </footer>
        )}
      </div>
    </div>
  )
}

export default App