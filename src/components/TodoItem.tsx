import { useState } from 'react';
import { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, text: string) => void;
}

function TodoItem({ todo, onToggle, onDelete, onUpdate }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleUpdate = () => {
    if (editText.trim()) {
      onUpdate(todo.id, editText.trim());
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleUpdate();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <li className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="w-5 h-5 text-blue-500 rounded focus:ring-blue-500 cursor-pointer"
      />
      
      {isEditing ? (
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            className="flex-1 px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleUpdate}
            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors text-sm"
          >
            Save
          </button>
          <button
            onClick={handleCancel}
            className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors text-sm"
          >
            Cancel
          </button>
        </div>
      ) : (
        <>
          <span
            onClick={() => onToggle(todo.id)}
            className={`flex-1 cursor-pointer ${
              todo.completed
                ? 'line-through text-gray-400'
                : 'text-gray-700'
            }`}
          >
            {todo.text}
          </span>
          <button
            onClick={() => setIsEditing(true)}
            className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors text-sm"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(todo.id)}
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-sm"
          >
            Delete
          </button>
        </>
      )}
    </li>
  );
}

export default TodoItem;