import { useState } from 'react'
import { Todo } from './types/Todo'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'
import './App.css'
import './components/TodoForm.css'
import './components/TodoList.css'
import './components/TodoItem.css'

function App() {
  const [todos, setTodos] = useState<Todo[]>([])

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      completed: false,
      createdAt: new Date()
    }
    setTodos([...todos, newTodo])
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const updateTodo = (id: number, text: string) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, text } : todo
    ))
  }

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  return (
    <div className="app">
      <h1>React Todo App</h1>
      <TodoForm onAddTodo={addTodo} />
      <TodoList
        todos={todos}
        onDeleteTodo={deleteTodo}
        onUpdateTodo={updateTodo}
        onToggleTodo={toggleTodo}
      />
    </div>
  )
}

export default App