import React, { useState } from 'react';
import styles from './AddTodoForm.module.css';

export default function AddTodoForm({ onAdd }) {
  const [text, setText] = useState('');
  const [shake, setShake] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = onAdd(text);
    if (success) {
      setText('');
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 400);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={`${styles.inputWrapper} ${shake ? styles.shake : ''}`}>
        <span className={styles.inputIcon}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </span>
        <input
          className={styles.input}
          type="text"
          placeholder="Add a new task..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength={200}
          aria-label="New todo text"
        />
        {text && (
          <button
            type="button"
            className={styles.clearBtn}
            onClick={() => setText('')}
            aria-label="Clear input"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>
      <button className={styles.addBtn} type="submit" aria-label="Add todo">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
        Add Task
      </button>
    </form>
  );
}
