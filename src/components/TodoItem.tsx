import { useEffect, useState } from 'react';
import { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, text: string) => void;
}

export default function TodoItem({ todo, onToggle, onDelete, onUpdate }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [draftText, setDraftText] = useState(todo.text);

  useEffect(() => {
    setDraftText(todo.text);
  }, [todo.text]);

  const handleSave = () => {
    const trimmed = draftText.trim();
    if (!trimmed) {
      setDraftText(todo.text);
      setIsEditing(false);
      return;
    }

    if (trimmed !== todo.text) {
      onUpdate(todo.id, trimmed);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setDraftText(todo.text);
    setIsEditing(false);
  };

  return (
    <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
      />
      {isEditing ? (
        <input
          value={draftText}
          onChange={(e) => setDraftText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSave();
            if (e.key === 'Escape') handleCancel();
          }}
          autoFocus
          className="flex-1 px-3 py-2 border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      ) : (
        <span
          className={`flex-1 ${todo.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}
        >
          {todo.text}
        </span>
      )}
      {isEditing ? (
        <div className="flex items-center gap-2">
          <button
            onClick={handleSave}
            className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Save
          </button>
          <button
            onClick={handleCancel}
            className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded transition-colors"
          >
            Cancel
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsEditing(true)}
            className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded transition-colors"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(todo.id)}
            className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded transition-colors"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
