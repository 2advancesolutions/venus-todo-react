import React, { useState } from 'react';
import TodoCard from './TodoCard';
import styles from './CompletedSection.module.css';

export default function CompletedSection({ todos, onUpdate, onDelete, onUncomplete, onClearAll, dragHandlers }) {
  const [open, setOpen] = useState(true);

  if (todos.length === 0) return null;

  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <button
          className={styles.toggle}
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="completed-list"
        >
          <span className={`${styles.chevron} ${open ? styles.chevronOpen : ''}`}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </span>
          <span className={styles.title}>
            Completed
            <span className={styles.badge}>{todos.length}</span>
          </span>
        </button>
        <button className={styles.clearBtn} onClick={onClearAll} title="Clear all completed">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
            <path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>
          </svg>
          Clear all
        </button>
      </div>

      {open && (
        <div id="completed-list" className={styles.list}>
          {todos.map((todo) => (
            <div key={todo.id} className={styles.cardWrapper}>
              <TodoCard
                todo={todo}
                onUpdate={onUpdate}
                onDelete={onDelete}
                onDragStart={dragHandlers.handleDragStart}
                onDragEnd={dragHandlers.handleDragEnd}
                isDragging={dragHandlers.draggingId === todo.id}
              />
              <button
                className={styles.uncompleteBtn}
                onClick={() => onUncomplete(todo.id)}
                title="Move back to pending"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-5"/>
                </svg>
                Undo
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
