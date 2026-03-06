import React, { useState, useRef } from 'react';
import { useTodos } from './hooks/useTodos';
import { useDragDrop } from './hooks/useDragDrop';
import TodoCard from './components/TodoCard';
import DropZone from './components/DropZone';
import CompletedSection from './components/CompletedSection';
import StatsBar from './components/StatsBar';
import styles from './App.module.css';

export default function App() {
  const {
    pending,
    completed,
    addTodo,
    updateTodo,
    deleteTodo,
    completeTodo,
    uncompleteTodo,
    clearCompleted,
  } = useTodos();

  const [inputText, setInputText] = useState('');
  const [inputError, setInputError] = useState('');
  const [filter, setFilter] = useState('all');
  const inputRef = useRef(null);

  const drag = useDragDrop((id) => {
    // Only complete if it's a pending task
    if (pending.find((t) => t.id === id)) {
      completeTodo(id);
    }
  });

  const handleAdd = (e) => {
    e.preventDefault();
    if (!inputText.trim()) {
      setInputError('Please enter a task.');
      inputRef.current?.focus();
      return;
    }
    const ok = addTodo(inputText);
    if (ok) {
      setInputText('');
      setInputError('');
    }
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
    if (inputError) setInputError('');
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter') handleAdd(e);
  };

  const filteredPending =
    filter === 'all'
      ? pending
      : pending.filter((t) => {
          if (filter === 'today') {
            const d = new Date(t.createdAt);
            const now = new Date();
            return d.toDateString() === now.toDateString();
          }
          return true;
        });

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Header */}
        <header className={styles.header}>
          <div className={styles.logoRow}>
            <span className={styles.logoEmoji}>✅</span>
            <div>
              <h1 className={styles.title}>My Tasks</h1>
              <p className={styles.subtitle}>Stay focused. Get it done.</p>
            </div>
          </div>
        </header>

        {/* Progress */}
        <StatsBar pending={pending.length} completed={completed.length} />

        {/* Add form */}
        <form className={styles.addForm} onSubmit={handleAdd} noValidate>
          <div className={`${styles.inputWrap} ${inputError ? styles.inputError : ''}`}>
            <svg className={styles.inputIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            <input
              ref={inputRef}
              type="text"
              className={styles.input}
              placeholder="Add a new task…"
              value={inputText}
              onChange={handleInputChange}
              onKeyDown={handleInputKeyDown}
              maxLength={200}
              aria-label="New task"
              aria-invalid={!!inputError}
              aria-describedby={inputError ? 'add-error' : undefined}
            />
            <span className={styles.charCount}>{inputText.length}/200</span>
          </div>
          {inputError && (
            <span id="add-error" className={styles.errorMsg} role="alert">
              {inputError}
            </span>
          )}
          <button type="submit" className={styles.addBtn}>
            Add Task
          </button>
        </form>

        {/* Filter */}
        <div className={styles.filterRow}>
          {['all', 'today'].map((f) => (
            <button
              key={f}
              className={`${styles.filterBtn} ${filter === f ? styles.filterActive : ''}`}
              onClick={() => setFilter(f)}
            >
              {f === 'all' ? 'All' : 'Added Today'}
            </button>
          ))}
          <span className={styles.countLabel}>{filteredPending.length} task{filteredPending.length !== 1 ? 's' : ''}</span>
        </div>

        {/* Pending todos */}
        <div className={styles.listArea} aria-label="Pending tasks">
          {filteredPending.length === 0 && (
            <div className={styles.emptyState}>
              <span className={styles.emptyIcon}>🎉</span>
              <p>
                {pending.length === 0
                  ? 'All clear! Add a task above.'
                  : 'No tasks match this filter.'}
              </p>
            </div>
          )}

          {filteredPending.map((todo) => (
            <TodoCard
              key={todo.id}
              todo={todo}
              onUpdate={updateTodo}
              onDelete={deleteTodo}
              onDragStart={drag.handleDragStart}
              onDragEnd={drag.handleDragEnd}
              isDragging={drag.draggingId === todo.id}
            />
          ))}

          {/* Drop zone: only visible when dragging a pending task */}
          <DropZone
            isActive={drag.dropActive}
            isDragging={drag.isDragging && !!pending.find((t) => t.id === drag.draggingId)}
            onDragEnter={drag.handleDragEnter}
            onDragLeave={drag.handleDragLeave}
            onDragOver={drag.handleDragOver}
            onDrop={drag.handleDrop}
          />
        </div>

        {/* Completed section */}
        <CompletedSection
          todos={completed}
          onUpdate={updateTodo}
          onDelete={deleteTodo}
          onUncomplete={uncompleteTodo}
          onClearAll={clearCompleted}
          dragHandlers={drag}
        />
      </div>
    </div>
  );
}
