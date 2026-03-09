import { useState } from 'react'
import { Todo } from '../types/todo'

interface TodoItemProps {
  todo: Todo
  onUpdate: (id: string, updates: Partial<Pick<Todo, 'text' | 'completed'>>) => void
  onDelete: (id: string) => void
}

export default function TodoItem({ todo, onUpdate, onDelete }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)

  const handleSave = () => {
    if (editText.trim()) {
      onUpdate(todo.id, { text: editText.trim() })
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
      <div className="flex items-center flex-1">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={(e) => onUpdate(todo.id, { completed: e.target.checked })}
          className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
        />
        
        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            className="input ml-3 flex-1"
            autoFocus
          />
        ) : (
          <span 
            className={`todo-text ${todo.completed ? 'completed' : ''}`}
            onDoubleClick={() => setIsEditing(true)}
          >
            {todo.text}
          </span>
        )}
      </div>

      <div className="flex gap-2">
        {isEditing ? (
          <>
            <button onClick={handleSave} className="btn btn-primary text-sm">
              Save
            </button>
            <button onClick={handleCancel} className="btn btn-secondary text-sm">
              Cancel
            </button>
          </>
        ) : (
          <>
            <button 
              onClick={() => setIsEditing(true)} 
              className="btn btn-secondary text-sm"
            >
              Edit
            </button>
            <button 
              onClick={() => onDelete(todo.id)} 
              className="btn btn-danger text-sm"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  )
}