import { useEffect, useMemo, useState } from 'react';

const LOCAL_STORAGE_KEY = 'venus-todo-items';

const createEmptyTodo = () => ({
  id: crypto.randomUUID(),
  text: '',
  completed: false,
});

function App() {
  const [todos, setTodos] = useState(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Failed to parse saved todos', error);
      return [];
    }
  });

  const [draft, setDraft] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const completedCount = useMemo(() => todos.filter((todo) => todo.completed).length, [todos]);

  const handleAddTodo = (event) => {
    event.preventDefault();
    const trimmed = draft.trim();
    if (!trimmed) return;

    const newTodo = {
      id: crypto.randomUUID(),
      text: trimmed,
      completed: false,
    };

    setTodos((prev) => [newTodo, ...prev]);
    setDraft('');
  };

  const handleToggle = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              completed: !todo.completed,
            }
          : todo
      )
    );
  };

  const handleDelete = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
    if (editingId === id) {
      setEditingId(null);
      setEditingText('');
    }
  };

  const startEditing = (id) => {
    const todo = todos.find((item) => item.id === id);
    if (!todo) return;
    setEditingId(id);
    setEditingText(todo.text);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditingText('');
  };

  const submitEdit = (event) => {
    event.preventDefault();
    if (editingId === null) return;
    const trimmed = editingText.trim();
    if (!trimmed) {
      handleDelete(editingId);
      return;
    }

    setTodos((prev) =>
      prev.map((todo) => (todo.id === editingId ? { ...todo, text: trimmed } : todo))
    );
    setEditingId(null);
    setEditingText('');
  };

  const remainingCount = todos.length - completedCount;

  return (
    <div className="app">
      <header className="header">
        <h1>Tasks</h1>
        <p className="subtitle">A tidy, local-first todo list built with React.</p>
      </header>

      <main className="card">
        <form className="add-form" onSubmit={handleAddTodo}>
          <input
            type="text"
            placeholder="Add a new task"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            aria-label="Todo description"
          />
          <button type="submit" className="primary">
            Add task
          </button>
        </form>

        {todos.length === 0 ? (
          <p className="empty">You're all caught up! Add your first task above.</p>
        ) : (
          <ul className="todo-list">
            {todos.map((todo) => (
              <li key={todo.id} className={`todo ${todo.completed ? 'completed' : ''}`}>
                <div className="todo-main">
                  <label className="toggle">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => handleToggle(todo.id)}
                      aria-label={`Mark ${todo.text} as ${todo.completed ? 'incomplete' : 'done'}`}
                    />
                    <span />
                  </label>

                  {editingId === todo.id ? (
                    <form className="edit-form" onSubmit={submitEdit}>
                      <input
                        type="text"
                        value={editingText}
                        onChange={(event) => setEditingText(event.target.value)}
                        aria-label="Edit todo text"
                        autoFocus
                      />
                    </form>
                  ) : (
                    <span className="todo-text">{todo.text}</span>
                  )}
                </div>

                <div className="actions">
                  {editingId === todo.id ? (
                    <>
                      <button type="button" className="primary" onClick={submitEdit}>
                        Save
                      </button>
                      <button type="button" className="ghost" onClick={cancelEditing}>
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button type="button" className="ghost" onClick={() => startEditing(todo.id)}>
                        Edit
                      </button>
                      <button type="button" className="danger" onClick={() => handleDelete(todo.id)}>
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}

        <footer className="footer">
          <span>
            {remainingCount} {remainingCount === 1 ? 'task' : 'tasks'} remaining
          </span>
          <span>
            {completedCount} {completedCount === 1 ? 'task' : 'tasks'} done
          </span>
        </footer>
      </main>
    </div>
  );
}

export default App;
