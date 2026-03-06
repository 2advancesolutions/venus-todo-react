import React, { useState, useRef, useEffect } from 'react';
import styles from './TodoCard.module.css';

const PRIORITY_COLORS = {
  none:   { dot: 'var(--text-muted)',        label: 'No priority' },
  low:    { dot: 'var(--accent-green)',      label: 'Low' },
  medium: { dot: 'var(--accent-amber)',      label: 'Medium' },
  high:   { dot: 'var(--accent-red)',        label: 'High' },
};

function formatDate(ts) {
  if (!ts) return '';
  const d = new Date(ts);
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

export default function TodoCard({ todo, onUpdate, onDelete, onDragStart, onDragEnd, isDragging }) {
  const [editing, setEditing]   = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [editError, setEditError] = useState('');
  const [priority, setPriority] = useState(todo.priority || 'none');
  const editRef = useRef(null);

  useEffect(() => {
    if (editing) {
      editRef.current?.focus();
      const len = editRef.current?.value.length || 0;
      editRef.current?.setSelectionRange(len, len);
    }
  }, [editing]);

  const handleSave = () => {
    const trimmed = editText.trim();
    if (!trimmed) {
      setEditError('Task text cannot be empty.');
      editRef.current?.focus();
      return;
    }
    const ok = onUpdate(todo.id, trimmed);
    if (ok) {
      setEditing(false);
      setEditError('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') {
      setEditText(todo.text);
      setEditing(false);
      setEditError('');
    }
  };

  const handlePriorityChange = (e) => {
    const val = e.target.value;
    setPriority(val);
    // Persist priority via update — store as synthetic field
    onUpdate(todo.id, todo.text, { priority: val });
  };

  return (
    <div
      className={`${styles.card} ${todo.completed ? styles.completed : ''} ${isDragging ? styles.dragging : ''}`}
      draggable={!editing}
      onDragStart={(e) => onDragStart(e, todo.id)}
      onDragEnd={onDragEnd}
      role="listitem"
      aria-label={`Task: ${todo.text}`}
    >
      {/* Drag handle */}
      {!todo.completed && (
        <span className={styles.grip} title="Drag to complete" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="5"  r="1"/><circle cx="9"  cy="12" r="1"/><circle cx="9"  cy="19" r="1"/>
            <circle cx="15" cy="5" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="19" r="1"/>
          </svg>
        </span>
      )}

      {/* Completed checkmark */}
      {todo.completed && (
        <span className={styles.checkmark} aria-label="Completed">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </span>
      )}

      {/* Priority dot */}
      <span
        className={styles.priorityDot}
        style={{ background: PRIORITY_COLORS[priority]?.dot }}
        title={`Priority: ${PRIORITY_COLORS[priority]?.label}`}
      />

      {/* Text / Edit area */}
      <div className={styles.body}>
        {editing ? (
          <>
            <input
              ref={editRef}
              type="text"
              className={`${styles.editInput} ${editError ? styles.editError : ''}`}
              value={editText}
              onChange={(e) => {
                setEditText(e.target.value);
                if (editError) setEditError('');
              }}
              onKeyDown={handleKeyDown}
              maxLength={200}
              aria-label="Edit task"
            />
            {editError && (
              <span className={styles.editErrorMsg} role="alert">{editError}</span>
            )}
            <div className={styles.editActions}>
              <button className={styles.saveBtn} onClick={handleSave}>
                Save
              </button>
              <button
                className={styles.cancelBtn}
                onClick={() => {
                  setEditText(todo.text);
                  setEditing(false);
                  setEditError('');
                }}
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <p
              className={styles.text}
              onDoubleClick={() => !todo.completed && setEditing(true)}
              title="Double-click to edit"
            >
              {todo.text}
            </p>
            <span className={styles.meta}>
              {formatDate(todo.createdAt)}
              {todo.completed && todo.completedAt && (
                <> · completed {formatDate(todo.completedAt)}</>
              )}
            </span>
          </>
        )}
      </div>

      {/* Priority selector (only for pending) */}
      {!todo.completed && !editing && (
        <select
          className={styles.prioritySelect}
          value={priority}
          onChange={handlePriorityChange}
          title="Set priority"
          aria-label="Task priority"
        >
          <option value="none">—</option>
          <option value="low">Low</option>
          <option value="medium">Med</option>
          <option value="high">High</option>
        </select>
      )}

      {/* Action buttons */}
      <div className={styles.actions}>
        {!todo.completed && !editing && (
          <button
            className={`${styles.iconBtn} ${styles.editBtn}`}
            onClick={() => setEditing(true)}
            title="Edit task"
            aria-label="Edit task"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
          </button>
        )}
        <button
          className={`${styles.iconBtn} ${styles.deleteBtn}`}
          onClick={() => onDelete(todo.id)}
          title="Delete task"
          aria-label="Delete task"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
            <path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
