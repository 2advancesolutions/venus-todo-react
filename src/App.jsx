import { useMemo, useState } from 'react';
import './App.css';

const createTodo = (text) => ({
  id: crypto.randomUUID(),
  text,
  completed: false,
});

function App() {
  const [todos, setTodos] = useState(() => []);
  const [input, setInput] = useState('');
  const remainingCount = useMemo(
    () => todos.filter((todo) => !todo.completed).length,
    [todos]
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;
    setTodos((prev) => [createTodo(trimmed), ...prev]);
    setInput('');
  };

  const handleToggle = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDelete = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <div className="app">
      <header>
        <h1>Todo App</h1>
        <p>{remainingCount} task{remainingCount === 1 ? '' : 's'} remaining</p>
      </header>

      <form onSubmit={handleSubmit} className="todo-form">
        <input
          type="text"
          placeholder="What needs to be done?"
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
        <button type="submit">Add Todo</button>
      </form>

      {todos.length === 0 ? (
        <p className="empty-state">No todos yet. Add your first one!</p>
      ) : (
        <ul className="todo-list">
          {todos.map((todo) => (
            <li key={todo.id} className={todo.completed ? 'completed' : ''}>
              <label>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggle(todo.id)}
                />
                <span>{todo.text}</span>
              </label>
              <button
                className="delete-button"
                type="button"
                onClick={() => handleDelete(todo.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
