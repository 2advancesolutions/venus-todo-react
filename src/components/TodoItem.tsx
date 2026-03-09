import { FormEvent, KeyboardEvent, useEffect, useState } from 'react';
import { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, text: string) => void;
}

const TIMESTAMP_FORMATTER = new Intl.DateTimeFormat(undefined, {
  dateStyle: 'medium',
  timeStyle: 'short',
});

const formatTimestamp = (value: Date) => TIMESTAMP_FORMATTER.format(value);

export default function TodoItem({ todo, onToggle, onDelete, onUpdate }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(todo.text);

  useEffect(() => {
    if (!isEditing) {
      setDraft(todo.text);
    }
  }, [todo.text, isEditing]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmed = draft.trim();
    if (!trimmed) {
      return;
    }

    if (trimmed !== todo.text) {
      onUpdate(todo.id, trimmed);
    }

    setIsEditing(false);
  };

  const handleCancel = () => {
    setDraft(todo.text);
    setIsEditing(false);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      handleCancel();
    }
  };

  return (
    <article
      className={`todo-item ${todo.completed ? 'todo-item--completed' : ''}`}
      aria-label={`Todo: ${todo.text}`}
    >
      <div className="todo-item__checkbox">
        <input
          id={`todo-checkbox-${todo.id}`}
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          aria-label={todo.completed ? 'Mark todo as incomplete' : 'Mark todo as complete'}
        />
      </div>

      <div className="todo-item__body">
        {isEditing ? (
          <form className="todo-item__edit" onSubmit={handleSubmit}>
            <label htmlFor={`todo-edit-${todo.id}`} className="visually-hidden">
              Edit todo
            </label>
            <input
              id={`todo-edit-${todo.id}`}
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={handleKeyDown}
              className="todo-item__edit-input"
              autoFocus
            />
            <div className="todo-item__edit-controls">
              <button type="submit" className="button button--primary">
                Save
              </button>
              <button type="button" className="button button--ghost" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <>
            <p className="todo-item__text">{todo.text}</p>
            <div className="todo-item__meta">
              <span>Added {formatTimestamp(todo.createdAt)}</span>
              {todo.updatedAt && <span>Updated {formatTimestamp(todo.updatedAt)}</span>}
            </div>
          </>
        )}
      </div>

      {!isEditing && (
        <div className="todo-item__actions">
          <button type="button" className="button button--ghost" onClick={() => setIsEditing(true)}>
            Edit
          </button>
          <button type="button" className="button button--danger" onClick={() => onDelete(todo.id)}>
            Delete
          </button>
        </div>
      )}
    </article>
  );
}
