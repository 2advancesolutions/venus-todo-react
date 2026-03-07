import { useMemo, useState } from 'react';
import TodoItem from './components/TodoItem.jsx';
import TodoForm from './components/TodoForm.jsx';
import TodoSummary from './components/TodoSummary.jsx';

const useTodoState = () => {
  const [todos, setTodos] = useState([]);

  const addTodo = (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    setTodos((current) => [
      {
        id: crypto.randomUUID(),
        text: trimmed,
        completed: false,
        createdAt: Date.now(),
      },
      ...current,
    ]);
  };

  const deleteTodo = (id) => {
    setTodos((current) => current.filter((todo) => todo.id !== id));
  };

  const toggleTodo = (id) => {
    setTodos((current) =>
      current.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const updateTodo = (id, text) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    setTodos((current) =>
      current.map((todo) => (todo.id === id ? { ...todo, text: trimmed } : todo)),
    );
  };

  return {
    todos,
    addTodo,
    deleteTodo,
    toggleTodo,
    updateTodo,
  };
};

function App() {
  const { todos, addTodo, deleteTodo, toggleTodo, updateTodo } = useTodoState();
  const [searchTerm, setSearchTerm] = useState('');
  const [showCompleted, setShowCompleted] = useState(true);

  const filteredTodos = useMemo(() => {
    const normalizedTerm = searchTerm.trim().toLowerCase();

    return todos.filter((todo) => {
      const matchesTerm = todo.text.toLowerCase().includes(normalizedTerm);
      const matchesCompletedState = showCompleted ? true : !todo.completed;
      return matchesTerm && matchesCompletedState;
    });
  }, [todos, searchTerm, showCompleted]);

  return (
    <div className="app-shell">
      <header className="app-header">
        <h1 className="app-title">Venus Todo</h1>
        <p className="app-subtitle">Add, update, and complete tasks with ease.</p>
      </header>

      <main className="app-main">
        <section className="panel">
          <TodoForm onSubmit={addTodo} />

          <div className="filters">
            <label className="filter-input">
              <span className="sr-only">Search todos</span>
              <input
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search by keyword..."
                aria-label="Search todos"
              />
            </label>

            <label className="filter-checkbox">
              <input
                type="checkbox"
                checked={showCompleted}
                onChange={(event) => setShowCompleted(event.target.checked)}
              />
              <span>Show completed</span>
            </label>
          </div>
        </section>

        <section className="panel">
          <TodoSummary todos={todos} visibleTodos={filteredTodos} />

          {filteredTodos.length === 0 ? (
            <p className="empty-state">
              {todos.length === 0
                ? 'Your todo list is empty. Add your first task to get started!'
                : 'No todos match your current filters.'}
            </p>
          ) : (
            <ul className="todo-list" aria-live="polite">
              {filteredTodos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={() => toggleTodo(todo.id)}
                  onDelete={() => deleteTodo(todo.id)}
                  onUpdate={(text) => updateTodo(todo.id, text)}
                />
              ))}
            </ul>
          )}
        </section>
      </main>

      <footer className="app-footer">
        <p>
          Built with ❤️ using React and Vite. Tasks persist for the current session.
        </p>
      </footer>
    </div>
  );
}

export default App;
