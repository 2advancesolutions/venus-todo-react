import { useEffect, useRef, useState } from 'react';

function TodoItem({
  todo,
  onUpdate,
  onDelete,
  onToggleComplete,
  onDragStart,
  onDragEnd,
}) {
  const { id, text, completed } = todo;
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(text);
  const inputRef = useRef(null);

  useEffect(() => {
    setDraft(text);
  }, [text]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleSubmitEdit = (event) => {
    event.preventDefault();
    const trimmed = draft.trim();
    if (!trimmed) {
      return;
    }
    onUpdate(id, trimmed);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setDraft(text);
    setIsEditing(false);
  };

  const handleDragStartLocal = (event) => {
    event.dataTransfer.setData('text/plain', id);
    onDragStart?.(id);
  };

  return (
    <li
      className={`todo-item ${completed ? 'todo-item--completed' : ''}`}
      draggable={!isEditing}
      onDragStart={handleDragStartLocal}
      onDragEnd={onDragEnd}
    >
      {isEditing ? (
        <form className="todo-item__edit" onSubmit={handleSubmitEdit}>
          <input
            ref={inputRef}
            type="text"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            aria-label="Update todo"
          />
          <div className="todo-item__actions">
            <button type="submit" className="primary-button">
              Save
            </button>
            <button type="button" className="ghost-button" onClick={handleCancelEdit}>
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="todo-item__content">
          <div className="todo-item__text" role="button" tabIndex={0}>
            {text}
          </div>
          <div className="todo-item__actions">
            <button
              type="button"
              className="ghost-button"
              onClick={() => onToggleComplete(id)}
            >
              {completed ? 'Mark active' : 'Complete'}
            </button>
            <button
              type="button"
              className="ghost-button"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
            <button
              type="button"
              className="danger-button"
              onClick={() => onDelete(id)}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </li>
  );
}

export default TodoItem;
