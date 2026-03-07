import React from 'react';
import { Todo } from '../types/todo';
import { useDrag } from 'react-dnd';

interface TodoItemProps {
  todo: Todo;
  index: number;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, title: string, description?: string) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  index,
  onToggle,
  onDelete,
  onUpdate,
}) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'todo',
    item: { id: todo.id, index, type: 'todo' },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [isEditing, setIsEditing] = React.useState(false);
  const [editTitle, setEditTitle] = React.useState(todo.title);
  const [editDescription, setEditDescription] = React.useState(todo.description || '');

  const handleSave = () => {
    if (editTitle.trim()) {
      onUpdate(todo.id, editTitle.trim(), editDescription.trim() || undefined);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditTitle(todo.title);
    setEditDescription(todo.description || '');
    setIsEditing(false);
  };

  return (
    <div
      ref={drag}
      className={`bg-white rounded-lg shadow-sm border border-slate-200 p-4 mb-3 transition-all duration-200 cursor-move ${
        isDragging ? 'opacity-50 scale-95' : 'hover:shadow-md'
      } ${todo.completed ? 'opacity-75' : ''}`}
    >
      {isEditing ? (
        <div className="space-y-3">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500"
            autoFocus
          />
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 resize-none"
            rows={2}
            placeholder="Description (optional)"
          />
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="px-3 py-1 bg-slate-300 text-slate-700 rounded-md hover:bg-slate-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo.id)}
            className="mt-1 w-5 h-5 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500 cursor-pointer"
          />
          
          <div className="flex-1">
            <h3 className={`font-medium text-slate-800 ${todo.completed ? 'line-through text-slate-500' : ''}`}>
              {todo.title}
            </h3>
            {todo.description && (
              <p className={`text-sm text-slate-600 mt-1 ${todo.completed ? 'line-through' : ''}`}>
                {todo.description}
              </p>
            )}
            <p className="text-xs text-slate-400 mt-2">
              {todo.createdAt.toLocaleDateString()}
            </p>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => setIsEditing(true)}
              className="text-slate-400 hover:text-indigo-600 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              className="text-slate-400 hover:text-red-600 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};