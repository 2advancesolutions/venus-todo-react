import React, { useState } from 'react';
import { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onUpdate: (id: string, text: string) => void;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({ 
  todo, 
  onUpdate, 
  onDelete, 
  onToggle 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleSave = () => {
    if (editText.trim()) {
      onUpdate(todo.id, editText.trim());
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <li className="todo-item">
      <input
        type="checkbox"
        className="todo-checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      
      {isEditing ? (
        <input
          type="text"
          className="todo-text editing"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={handleKeyPress}
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

      <div className="todo-actions">
        {isEditing ? (
          <>
            <button 
              className="todo-save"
              onClick={handleSave}
            >
              Save
            </button>
            <button 
              className="todo-cancel"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button 
              className="todo-edit"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
            <button 
              className="todo-delete"
              onClick={() => onDelete(todo.id)}
            >
              Delete
            </button>
          </>
        )}
      </div>
    </li>
  );
};