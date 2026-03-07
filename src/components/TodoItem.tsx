import { useState } from 'react';
import { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleSave = () => {
    if (editText.trim() && editText !== todo.text) {
      onEdit(todo.id, editText.trim());
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <div className="group flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
      />
      
      {isEditing ? (
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleSave}
          className="flex-1 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          autoFocus
        />
      ) : (
        <span
          className={`flex-1 cursor-pointer ${todo.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}
          onClick={() => setIsEditing(true)}
        >
          {todo.text}
        </span>
      )}

      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800 transition-colors"
          >
            Edit
          </button>
        )}
        {isEditing && (
          <button
            onClick={handleSave}
            className="px-3 py-1 text-sm text-green-600 hover:text-green-800 transition-colors"
          >
            Save
          </button>
        )}
        {isEditing && (
          <button
            onClick={handleCancel}
            className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancel
          </button>
        )}
        <button
          onClick={() => onDelete(todo.id)}
          className="px-3 py-1 text-sm text-red-600 hover:text-red-800 transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
}