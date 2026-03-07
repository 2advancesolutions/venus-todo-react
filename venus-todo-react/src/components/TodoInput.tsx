import React, { useState } from 'react'

interface TodoInputProps {
  onAddTodo: (text: string) => void
}

const TodoInput: React.FC<TodoInputProps> = ({ onAddTodo }) => {
  const [text, setText] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (text.trim()) {
      onAddTodo(text)
      setText('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="todo-input-container">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What needs to be done?"
        className="todo-input"
      />
      <button type="submit" className="add-btn">
        Add
      </button>
    </form>
  )
}

export default TodoInput