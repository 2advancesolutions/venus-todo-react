import { useState } from 'react'
import { Todo } from '../types/Todo'

interface TodoItemProps {
  todo: Todo
  onUpdateTodo: (id: number, text: string) => void
  onDeleteTodo: (id: number) => void
  onToggleTodo: (id: number) => void
}

function TodoItem({ todo, onUpdateTodo, onDeleteTodo, onToggleTodo }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)

  const handleSave = () => {
    if (editText.trim()) {
      onUpdateTodo(todo.id, editText.trim())
      setIsEditing(false)
    }
  }

  const handleCancel = () => {
    setEditText(todo.text)
    setIsEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave()
    } else if (e.key === 'Escape') {
      handleCancel()
    }
  }

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggleTodo(todo.id)}
        className="todo-checkbox"
      />
      
      {isEditing ? (
        <div className="edit-mode">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            className="edit-input"
            autoFocus
          />
          <button onClick={handleSave} className="save-button">Save</button>
          <button onClick={handleCancel} className="cancel-button">Cancel</button>
        </div>
      ) : (
        <div className="view-mode">
          <span className="todo-text" onClick={() => setIsEditing(true)}>
            {todo.text}
          </span>
          <div className="todo-actions">
            <button onClick={() => setIsEditing(true)} className="edit-button">
              Edit
            </button>
            <button onClick={() => onDeleteTodo(todo.id)} className="delete-button">
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default TodoItem