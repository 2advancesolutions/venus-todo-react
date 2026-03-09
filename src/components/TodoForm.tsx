import { useState } from 'react'
import { TodoInput } from './TodoInput'
import { TodoList } from './TodoList'
import { Todo } from '../types/todo'

export function TodoForm() {
  const [todos, setTodos] = useState<Todo[]>([])

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      createdAt: new Date(),
    }
    setTodos(prev => [newTodo, ...prev])
  }

  const toggleTodo = (id: string) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    )
  }

  const editTodo = (id: string, text: string) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, text } : todo
      )
    )
  }

  const deleteTodo = (id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id))
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">My Todos</h1>
        <TodoInput onAdd={addTodo} />
      </div>
      
      <div className="bg-white rounded-lg shadow-lg p-6">
        <TodoList
          todos={todos}
          onToggle={toggleTodo}
          onEdit={editTodo}
          onDelete={deleteTodo}
        />
      </div>
    </div>
  )
}