import { useState } from 'react'
import { Todo } from '../types/todo'

interface TodoItemProps {
  todo: Todo
  onToggle: (id: string) => void
  onEdit: (id: string, text: string) => void
  onDelete: (id: string) => void
}

export function TodoItem({ todo, onToggle, onEdit, onDelete }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)

  const handleSave = () => {
    if (editText.trim() && editText !== todo.text) {
      onEdit(todo.id, editText.trim())
    }
    setIsEditing(false)
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
    <div className="group flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 animate-fade-in">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
      />
      
      {isEditing ? (
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleSave}
          className="input-field flex-1 text-sm"
          autoFocus
          maxLength={200}
        />
      ) : (
        <span
          className={`flex-1 text-sm cursor-pointer ${
            todo.completed ? 'line-through text-gray-500' : 'text-gray-900'
          }`}
          onClick={() => setIsEditing(true)}
        >
          {todo.text}
        </span>
      )}

      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="btn-secondary text-xs px-2 py-1"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="btn-secondary text-xs px-2 py-1"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="btn-secondary text-xs px-2 py-1"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              className="btn-danger text-xs px-2 py-1"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  )
}