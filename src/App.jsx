import React, { useState, useRef } from 'react';
import { useTodos } from './hooks/useTodos';
import { useDragDrop } from './hooks/useDragDrop';
import TodoCard from './components/TodoCard';
import DropZone from './components/DropZone';
import CompletedSection from './components/CompletedSection';
import StatsBar from './components/StatsBar';
import styles from './App.module.css';

/* ── Small inline SVG icons (no extra dep) ─────────────────────── */
const PlusIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
    aria-hidden="true">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5"  y1="12" x2="19" y2="12" />
  </svg>
);

const SearchIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
    aria-hidden="true">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

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

  const [inputText,  setInputText]  = useState('');
  const [inputError, setInputError] = useState('');
  const [filter,     setFilter]     = useState('all');
  const inputRef = useRef(null);

  /* Drag-and-drop: dropping onto the DropZone completes the task */
  const drag = useDragDrop((id) => {
    if (pending.find((t) => t.id === id)) completeTodo(id);
  });

  /* ── Handlers ──────────────────────────────────────────────── */
  const handleAdd = (e) => {
    e.preventDefault();
    const trimmed = inputText.trim();
    if (!trimmed) {
      setInputError('Task cannot be empty.');
      inputRef.current?.focus();
      return;
    }
    const ok = addTodo(trimmed);
    if (ok) {
      setInputText('');
      setInputError('');
    }
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
    if (inputError) setInputError('');
  };

  /* ── Filter logic ──────────────────────────────────────────── */
  const filteredPending =
    filter === 'today'
      ? pending.filter((t) => {
          const d   = new Date(t.createdAt);
          const now = new Date();
          return d.toDateString() === now.toDateString();
        })
      : pending;

  const taskWord = (n) => `${n} task${n !== 1 ? 's' : ''}`;
  const isDraggingPending = drag.isDragging &&
    !!pending.find((t) => t.id === drag.draggingId);

  /* ── Render ────────────────────────────────────────────────── */
  return (
    <div className={styles.page}>
      <div className={styles.container}>

        {/* ── Header ───────────────────────────────────────────── */}
        <header className={styles.header}>
          <div className={styles.logoRow}>
            <div className={styles.logoEmoji} aria-hidden="true">✅</div>
            <div>
              <h1 className={styles.title}>My Tasks</h1>
              <p className={styles.subtitle}>Stay focused. Ship it. 🚀</p>
            </div>
          </div>
        </header>

        {/* ── Progress bar ─────────────────────────────────────── */}
        <StatsBar pending={pending.length} completed={completed.length} />

        {/* ── Add-task form ────────────────────────────────────── */}
        <form
          className={styles.addForm}
          onSubmit={handleAdd}
          noValidate
          aria-label="Add a new task"
        >
          <div className={`${styles.inputWrap} ${inputError ? styles.inputError : ''}`}>
            <span className={styles.inputIcon}>
              <SearchIcon />
            </span>
            <input
              ref={inputRef}
              type="text"
              className={styles.input}
              placeholder="What needs to be done?"
              value={inputText}
              onChange={handleInputChange}
              onKeyDown={(e) => e.key === 'Enter' && handleAdd(e)}
              maxLength={200}
              aria-label="New task description"
              aria-invalid={!!inputError}
              aria-describedby={inputError ? 'add-error' : undefined}
              autoComplete="off"
              spellCheck
            />
            {inputText.length > 0 && (
              <span className={styles.charCount} aria-hidden="true">
                {inputText.length}/200
              </span>
            )}
          </div>

          {inputError && (
            <span id="add-error" className={styles.errorMsg} role="alert">
              {inputError}
            </span>
          )}

          <button type="submit" className={styles.addBtn}>
            <PlusIcon />
            Add Task
          </button>
        </form>

        {/* ── Filter bar ───────────────────────────────────────── */}
        <div className={styles.filterRow} role="group" aria-label="Filter tasks">
          {[
            { key: 'all',   label: 'All' },
            { key: 'today', label: 'Added Today' },
          ].map(({ key, label }) => (
            <button
              key={key}
              className={`${styles.filterBtn} ${filter === key ? styles.filterActive : ''}`}
              onClick={() => setFilter(key)}
              aria-pressed={filter === key}
            >
              {label}
            </button>
          ))}
          <span className={styles.countLabel} aria-live="polite">
            {taskWord(filteredPending.length)}
          </span>
        </div>

        {/* ── Pending task list ─────────────────────────────────── */}
        <section className={styles.listArea} aria-label="Pending tasks">
          {filteredPending.length === 0 ? (
            <div className={styles.emptyState} role="status">
              <span className={styles.emptyIcon} aria-hidden="true">
                {pending.length === 0 ? '🎉' : '🔍'}
              </span>
              <p>
                {pending.length === 0
                  ? 'All clear! Add your first task above.'
                  : 'No tasks match this filter.'}
              </p>
            </div>
          ) : (
            filteredPending.map((todo) => (
              <TodoCard
                key={todo.id}
                todo={todo}
                onUpdate={updateTodo}
                onDelete={deleteTodo}
                onDragStart={drag.handleDragStart}
                onDragEnd={drag.handleDragEnd}
                isDragging={drag.draggingId === todo.id}
              />
            ))
          )}

          {/* Drop zone — only renders while dragging a pending task */}
          <DropZone
            isActive={drag.dropActive}
            isDragging={isDraggingPending}
            onDragEnter={drag.handleDragEnter}
            onDragLeave={drag.handleDragLeave}
            onDragOver={drag.handleDragOver}
            onDrop={drag.handleDrop}
          />
        </section>

        {/* ── Completed section ────────────────────────────────── */}
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
