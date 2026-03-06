import { useState } from 'react';

function TodoSection({ title, count, onDropSection, emptyMessage, children }) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  const handleDragEnter = (event) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setIsDragOver(false);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    onDropSection?.();
    setIsDragOver(false);
  };

  return (
    <section
      className={`todo-section ${isDragOver ? 'todo-section--over' : ''}`}
      aria-label={title}
    >
      <header className="todo-section__header">
        <h2>{title}</h2>
        <span className="todo-section__badge" aria-label={`${count} todos`}>
          {count}
        </span>
      </header>
      <div
        className="todo-section__body"
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        role="list"
        aria-live="polite"
      >
        {children?.length ? (
          <ul className="todo-section__list">{children}</ul>
        ) : (
          <div className="todo-section__empty">{emptyMessage}</div>
        )}
      </div>
    </section>
  );
}

export default TodoSection;
