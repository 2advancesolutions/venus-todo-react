import React, { useState, useEffect } from 'react'
import TodoList from './components/TodoList'
import TodoInput from './components/TodoInput'
import TodoStats from './components/TodoStats'
import { Todo } from './types/todo'

function App() {
  const [todos, setTodos] = useState<Todo[]>([])

  useEffect(() => {
    const savedTodos = localStorage.getItem('todos')
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const addTodo = (text: string) => {
    if (text.trim() === '') return
    
    const newTodo: Todo = {
      id: Date.now(),
      text: text.trim(),
      completed: false,
      createdAt: new Date()
    }
    
    setTodos([newTodo, ...todos])
  }

  const updateTodo = (id: number, newText: string) => {
    setTodos(todos.map(todo => 
      todo.id === id 
        ? { ...todo, text: newText.trim() }
        : todo
    ))
  }

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id 
        ? { ...todo, completed: !todo.completed }
        : todo
    ))
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed))
  }

  return (
    <div className="todo-container">
      <div className="todo-header">
        <h1>📝 Venus Todo</h1>
        <p>Organize your tasks with style</p>
      </div>
      
      <TodoInput onAddTodo={addTodo} />
      
      <TodoList 
        todos={todos}
        onUpdateTodo={updateTodo}
        onToggleTodo={toggleTodo}
        onDeleteTodo={deleteTodo}
      />
      
      {todos.length > 0 && (
        <TodoStats 
          todos={todos}
          onClearCompleted={clearCompleted}
        />
      )}
    </div>
  )
}

export default App