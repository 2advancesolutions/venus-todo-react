import React, { useState, useEffect } from 'react'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'
import DropZone from './components/DropZone'

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos')
    return savedTodos ? JSON.parse(savedTodos) : []
  })

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
      createdAt: new Date().toISOString()
    }
    setTodos([...todos, newTodo])
  }

  const updateTodo = (id, newText) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, text: newText } : todo
    ))
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const toggleComplete = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const todoId = parseInt(e.dataTransfer.getData('text/plain'))
    toggleComplete(todoId)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const activeTodos = todos.filter(todo => !todo.completed)
  const completedTodos = todos.filter(todo => todo.completed)

  return (
    <div className="todo-app">
      <div className="todo-header">
        <h1>📝 Venus Todo App</h1>
        <p>Drag tasks to the drop zone to mark them complete!</p>
      </div>
      
      <TodoForm onAddTodo={addTodo} />
      
      <TodoList 
        todos={activeTodos}
        onUpdateTodo={updateTodo}
        onDeleteTodo={deleteTodo}
        onToggleComplete={toggleComplete}
      />
      
      <DropZone 
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        completedCount={completedTodos.length}
      />
      
      {completedTodos.length > 0 && (
        <div style={{ marginTop: '2rem' }}>
          <h3>Completed Tasks</h3>
          <TodoList 
            todos={completedTodos}
            onUpdateTodo={updateTodo}
            onDeleteTodo={deleteTodo}
            onToggleComplete={toggleComplete}
          />
        </div>
      )}
    </div>
  )
}

export default App