import React, { useState, useRef, useEffect } from 'react';
import styles from './TodoCard.module.css';

function timeAgo(ts) {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export default function TodoCard({
  todo,
  onUpdate,
  onDelete,
  onDragStart,
  onDragEnd,
  isDragging,
}) {
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const inputRef = useRef(null);
  const deleteTimerRef = useRef(null);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editing]);

  // Auto-cancel confirm delete after 3s
  useEffect(() => {
    if (confirmDelete) {
      deleteTimerRef.current = setTimeout(() => setConfirmDelete(false), 3000);
    }
    return () => clearTimeout(deleteTimerRef.current);
  }, [confirmDelete]);

  const handleEditStart = () => {
    setEditText(todo.text);
    setEditing(true);
  };

  const handleEditSave = () => {
    const success = onUpdate(todo.id, editText);
    if (success) setEditing(false);
  };

  const handleEditKeyDown = (e) => {
    if (e.key === 'Enter') handleEditSave();
    if (e.key === 'Escape') {
      setEditText(todo.text);
      setEditing(false);
    }
  };

  const handleDeleteClick = () => {
    if (confirmDelete) {
      onDelete(todo.id);
    } else {
      setConfirmDelete(true);
    }
  };

  return (
    <div
      className={`${styles.card} ${isDragging ? styles.dragging : ''} ${todo.completed ? styles.completed : ''}`}
      draggable={!editing}
      onDragStart={(e) => onDragStart(e, todo.id)}
      onDragEnd={onDragEnd}
    >
      <div className={styles.dragHandle} title="Drag to complete">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="9" cy="6" r="1.5"/><circle cx="15" cy="6" r="1.5"/>
          <circle cx="9" cy="12" r="1.5"/><circle cx="15" cy="12" r="1.5"/>
          <circle cx="9" cy="18" r="1.5"/><circle cx="15" cy="18" r="1.5"/>
        </svg>
      </div>

      <div className={styles.body}>
        {editing ? (
          <input
            ref={inputRef}
            className={styles.editInput}
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleEditKeyDown}
            onBlur={handleEditSave}
            maxLength={200}
            aria-label="Edit todo text"
          />
        ) : (
          <p className={styles.text}>{todo.text}</p>
        )}
        <span className={styles.time}>{timeAgo(todo.createdAt)}</span>
      </div>

      <div className={styles.actions}>
        {!todo.completed && (
          <>
            {editing ? (
              <button
                className={`${styles.btn} ${styles.saveBtn}`}
                onClick={handleEditSave}
                title="Save"
                aria-label="Save"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </button>
            ) : (
              <button
                className={`${styles.btn} ${styles.editBtn}`}
                onClick={handleEditStart}
                title="Edit"
                aria-label="Edit todo"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                </svg>
              </button>
            )}
          </>
        )}

        <button
          className={`${styles.btn} ${confirmDelete ? styles.confirmDeleteBtn : styles.deleteBtn}`}
          onClick={handleDeleteClick}
          title={confirmDelete ? 'Click again to confirm delete' : 'Delete'}
          aria-label={confirmDelete ? 'Confirm delete' : 'Delete todo'}
        >
          {confirmDelete ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
              <path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
