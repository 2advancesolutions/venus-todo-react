import { FormEvent, KeyboardEvent, useEffect, useMemo, useState } from 'react';
import { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onUpdate: (id: string, text: string) => void;
  onDelete: (id: string) => void;
}

export default function TodoItem({ todo, onToggle, onUpdate, onDelete }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(todo.text);

  useEffect(() => {
    setDraft(todo.text);
  }, [todo.text]);

  const createdAtLabel = useMemo(() => {
    const createdDate = todo.createdAt instanceof Date ? todo.createdAt : new Date(todo.createdAt);
    return createdDate.toLocaleString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }, [todo.createdAt]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = draft.trim();

    if (!trimmed) {
      cancelEditing();
      return;
    }

    if (trimmed !== todo.text) {
      onUpdate(todo.id, trimmed);
    }

    setIsEditing(false);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      cancelEditing();
    }
  };

  const startEditing = () => {
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setDraft(todo.text);
    setIsEditing(false);
  };

  const isSaveDisabled = draft.trim().length === 0;

  return (
    <div className="flex flex-col gap-2 rounded-lg border border-transparent bg-white p-4 shadow-sm transition-all duration-200 hover:border-blue-200 hover:shadow-md sm:flex-row sm:items-center">
      <div className="flex items-start gap-3 sm:flex-1">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="mt-1 h-5 w-5 cursor-pointer text-blue-600 focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex-1">
          {isEditing ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <input
                autoFocus
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                aria-label="Edit todo"
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={isSaveDisabled}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={cancelEditing}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-100"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div>
              <p className={`text-base ${todo.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                {todo.text}
              </p>
              <time className="mt-1 block text-xs text-gray-400">Added {createdAtLabel}</time>
            </div>
          )}
        </div>
      </div>
      {!isEditing && (
        <div className="flex items-center gap-2 self-end sm:self-center">
          <button
            type="button"
            onClick={startEditing}
            className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-600 transition-colors hover:border-blue-200 hover:text-blue-600"
          >
            Edit
          </button>
          <button
            type="button"
            onClick={() => onDelete(todo.id)}
            className="rounded-lg border border-red-100 px-3 py-1.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
