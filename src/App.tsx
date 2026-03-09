import { useMemo, useState } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { Todo } from './types/todo';

const createId = () => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleAddTodo = (text: string) => {
    const newTodo: Todo = {
      id: createId(),
      text,
      completed: false,
      createdAt: new Date(),
      updatedAt: null,
    };

    setTodos((previous) => [...previous, newTodo]);
  };

  const handleToggleTodo = (id: string) => {
    setTodos((previous) =>
      previous.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              completed: !todo.completed,
              updatedAt: new Date(),
            }
          : todo,
      ),
    );
  };

  const handleDeleteTodo = (id: string) => {
    setTodos((previous) => previous.filter((todo) => todo.id !== id));
  };

  const handleUpdateTodo = (id: string, nextText: string) => {
    setTodos((previous) =>
      previous.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              text: nextText,
              updatedAt: new Date(),
            }
          : todo,
      ),
    );
  };

  const stats = useMemo(() => {
    const total = todos.length;
    const completed = todos.filter((todo) => todo.completed).length;

    return {
      total,
      completed,
      remaining: total - completed,
    };
  }, [todos]);

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">Task Companion</h1>
        <p className="app__subtitle">Capture your todos, update them, and stay on track.</p>
      </header>

      <main className="card">
        <TodoForm onAdd={handleAddTodo} />

        <div className="card__status" aria-live="polite">
          <span className="card__status-item">Total: {stats.total}</span>
          <span className="card__status-item">Completed: {stats.completed}</span>
          <span className="card__status-item">Open: {stats.remaining}</span>
        </div>

        {todos.length === 0 ? (
          <p className="empty-state" role="status">
            You haven&apos;t added any todos yet. Create your first one above!
          </p>
        ) : (
          <TodoList
            todos={todos}
            onToggle={handleToggleTodo}
            onDelete={handleDeleteTodo}
            onUpdate={handleUpdateTodo}
          />
        )}
      </main>
    </div>
  );
}

export default App;
