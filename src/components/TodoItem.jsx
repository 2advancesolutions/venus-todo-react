import React, { useState } from 'react'

function TodoItem({ todo, onToggle, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)

  const handleEdit = () => {
    setIsEditing(true)
    setEditText(todo.text)
  }

  const handleSave = () => {
    if (editText.trim()) {
      onUpdate(todo.id, editText)
      setIsEditing(false)
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditText(todo.text)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSave()
    } else if (e.key === 'Escape') {
      handleCancel()
    }
  }

  return (\n    <li className="todo-item">
      <input
        type="checkbox"
        className="todo-checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        aria-label={`Mark "${todo.text}" as ${todo.completed ? 'incomplete' : 'complete'}`}
      />
      
      {isEditing ? (
        <input
          type="text"
          className="todo-edit-input"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={handleKeyPress}
          autoFocus
          aria-label="Edit task"
        />
      ) : (
        <span className={`todo-text ${todo.completed ? 'completed' : ''}`}>
          {todo.text}
        </span>
      )}
      
      <div className="todo-actions">
        {isEditing ? (
          <>
            <button
              className="todo-save-button"
              onClick={handleSave}
              disabled={!editText.trim()}
              aria-label="Save changes"
            >
              Save
            </button>
            <button
              className="todo-cancel-button"
              onClick={handleCancel}
              aria-label="Cancel editing"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              className="todo-edit-button"
              onClick={handleEdit}
              aria-label={`Edit "${todo.text}"`}
            >
              Edit
            </button>
            <button
              className="todo-delete-button"
              onClick={() => onDelete(todo.id)}
              aria-label={`Delete "${todo.text}"`}
            >
              Delete
            </button>
          </>
        )}
      </div>
    </li>
  )
}

export default TodoItem