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
      role="region"
      aria-label="Drop here to mark as complete"
    >
      <span className={styles.icon}>
        {isActive ? '✨' : '✅'}
      </span>
      <span className={styles.label}>
        {isActive ? 'Release to complete!' : 'Drop here to complete'}
      </span>
    </div>
  );
}
