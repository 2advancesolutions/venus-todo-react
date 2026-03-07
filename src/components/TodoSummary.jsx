function TodoSummary({ todos, visibleTodos }) {
  const total = todos.length;
  const completed = todos.filter((todo) => todo.completed).length;
  const remaining = total - completed;
  const visibleCount = visibleTodos.length;

  return (
    <div className="todo-summary" role="status" aria-live="polite">
      <span>
        <strong>{total}</strong> total
      </span>
      <span>
        <strong>{completed}</strong> completed
      </span>
      <span>
        <strong>{remaining}</strong> remaining
      </span>
      <span>
        Showing <strong>{visibleCount}</strong> task{visibleCount === 1 ? '' : 's'}
      </span>
    </div>
  );
}

export default TodoSummary;
