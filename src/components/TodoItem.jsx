import { useEffect, useState } from 'react';

function TodoItem({ todo, onToggle, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(todo.text);

  useEffect(() => {
    setDraft(todo.text);
  }, [todo.text]);

  const commitChanges = () => {
    const trimmed = draft.trim();
    if (!trimmed) {
      setDraft(todo.text);
      setIsEditing(false);
      return;
    }

    if (trimmed !== todo.text) {
      onUpdate(trimmed);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      commitChanges();
    } else if (event.key === 'Escape') {
      event.preventDefault();
      setDraft(todo.text);
      setIsEditing(false);
    }
  };

  return (
    <li className={`todo-item ${todo.completed ? 'todo-item--completed' : ''}`}>
      <div className="todo-item__main">
        <input
          id={`todo-${todo.id}`}
          type="checkbox"
          checked={todo.completed}
          onChange={onToggle}
          aria-label={todo.completed ? 'Mark todo as incomplete' : 'Mark todo as complete'}
        />

        {isEditing ? (
          <input
            className="todo-item__edit-input"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onBlur={commitChanges}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        ) : (
          <label
            htmlFor={`todo-${todo.id}`}
            className="todo-item__label"
            onDoubleClick={() => setIsEditing(true)}
          >
            {todo.text}
          </label>
        )}
      </div>

      <div className="todo-item__actions">
        {isEditing ? (
          <button type="button" onMouseDown={(event) => event.preventDefault()} onClick={commitChanges}>
            Save
          </button>
        ) : (
          <button type="button" onClick={() => setIsEditing(true)}>
            Edit
          </button>
        )}
        <button type="button" className="danger" onClick={onDelete}>
          Delete
        </button>
      </div>
    </li>
  );
}

export default TodoItem;
