import React, { useState } from 'react'

function TodoForm({ onAddTodo }) {
  const [inputText, setInputText] = useState('')

  const handleSubmit = (e) {
    e.preventDefault()
    if (inputText.trim()) {
      onAddTodo(inputText.trim())
      setInputText('')
    }
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="todo-input"
        placeholder="Add a new task..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <button type="submit" className="todo-button" disabled={!inputText.trim()}>
        Add Task
      </button>
    </form>
  )
}

export default TodoForm