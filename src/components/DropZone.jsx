import React from 'react';
import styles from './DropZone.module.css';

export default function DropZone({
  isActive,
  isDragging,
  onDragEnter,
  onDragLeave,
  onDragOver,
  onDrop,
}) {
  if (!isDragging) return null;

  return (
    <div
      className={`${styles.zone} ${isActive ? styles.active : ''}`}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
      onDrop={onDrop}
      aria-label="Drop here to complete task"
      role="region"
    >
      <div className={styles.inner}>
        <div className={styles.icon}>
          {isActive ? (
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
          ) : (
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="8 12 12 16 16 12"/>
              <line x1="12" y1="8" x2="12" y2="16"/>
            </svg>
          )}
        </div>
        <p className={styles.label}>
          {isActive ? 'Release to complete!' : 'Drop here to mark as done'}
        </p>
        {!isActive && (
          <p className={styles.hint}>Drag a task into this zone ✨</p>
        )}
      </div>
    </div>
  );
}
