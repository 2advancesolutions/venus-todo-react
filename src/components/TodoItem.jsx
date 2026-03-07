import React, { useState } from 'react'

function TodoItem({ todo, onUpdateTodo, onDeleteTodo, onToggleComplete }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)
  const [isDragging, setIsDragging] = useState(false)

  const handleEdit = () => {
    setIsEditing(true)
    setEditText(todo.text)
  }

  const handleSave = () => {
    if (editText.trim()) {
      onUpdateTodo(todo.id, editText.trim())
      setIsEditing(false)
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditText(todo.text)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave()
    } else if (e.key === 'Escape') {
      handleCancel()
    }
  }

  const handleDragStart = (e) => {
    setIsDragging(true)
    e.dataTransfer.setData('text/plain', todo.id.toString())
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragEnd = () => {
    setIsDragging(false)
  }

  return (
    <li 
      className={`todo-item ${todo.completed ? 'completed' : ''} ${isDragging ? 'dragging' : ''}`}
      draggable={!isEditing}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <input
        type="checkbox"
        className="todo-checkbox"
        checked={todo.completed}
        onChange={() => onToggleComplete(todo.id)}
      />
      
      {isEditing ? (
        <input
          type="text"
          className="todo-text editing"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      ) : (
        <span className="todo-text">{todo.text}</span>
      )}
      
      <div className="todo-actions">
        {isEditing ? (
          <>
            <button className="todo-edit-btn todo-save-btn" onClick={handleSave}>
              Save
            </button>
            <button className="todo-edit-btn todo-cancel-btn" onClick={handleCancel}>
              Cancel
            </button>
          </>
        ) : (
          <>
            <button className="todo-edit-btn" onClick={handleEdit}>
              Edit
            </button>
            <button className="todo-delete-btn" onClick={() => onDeleteTodo(todo.id)}>
              Delete
            </button>
          </>
        )}
      </div>
    </li>
  )
}

export default TodoItem