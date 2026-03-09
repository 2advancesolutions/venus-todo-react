import { FormEvent, useMemo, useState } from 'react';

type Todo = {
  id: string;
  title: string;
  isCompleted: boolean;
  createdAt: number;
};

const createTodo = (title: string): Todo => ({
  id: crypto.randomUUID(),
  title,
  isCompleted: false,
  createdAt: Date.now(),
});

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [draft, setDraft] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingDraft, setEditingDraft] = useState('');

  const stats = useMemo(() => {
    const total = todos.length;
    const completed = todos.filter((todo) => todo.isCompleted).length;
    const active = total - completed;
    return { total, active, completed };
  }, [todos]);

  const handleAdd = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = draft.trim();

    if (!trimmed) {
      return;
    }

    setTodos((previous) => [...previous, createTodo(trimmed)]);
    setDraft('');
  };

  const handleToggle = (id: string) => {
    setTodos((previous) =>
      previous.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo,
      ),
    );
  };

  const handleDelete = (id: string) => {
    setTodos((previous) => previous.filter((todo) => todo.id !== id));

    if (editingId === id) {
      setEditingId(null);
      setEditingDraft('');
    }
  };

  const startEditing = (todo: Todo) => {
    setEditingId(todo.id);
    setEditingDraft(todo.title);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditingDraft('');
  };

  const saveEditing = (id: string) => {
    const trimmed = editingDraft.trim();
    if (!trimmed) {
      return;
    }

    setTodos((previous) =>
      previous.map((todo) => (todo.id === id ? { ...todo, title: trimmed } : todo)),
    );
    setEditingId(null);
    setEditingDraft('');
  };

  return (
    <div style={styles.page}>
      <main style={styles.main}>
        <header>
          <h1 style={styles.heading}>Tasks</h1>
          <p style={styles.subheading}>
            Add new todos, make edits inline, and keep track of what is complete.
          </p>
        </header>

        <section aria-labelledby="add-todo" style={styles.card}>
          <h2 id="add-todo" style={styles.sectionHeading}>
            Add a task
          </h2>
          <form onSubmit={handleAdd} style={styles.form}>
            <label htmlFor="new-todo" style={styles.visuallyHidden}>
              Describe your task
            </label>
            <input
              id="new-todo"
              name="new-todo"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="What do you want to get done?"
              autoComplete="off"
              maxLength={120}
              style={styles.input}
            />
            <button type="submit" style={styles.primaryButton}>
              Add
            </button>
          </form>
        </section>

        <section aria-labelledby="todo-list" style={styles.card}>
          <header style={styles.listHeader}>
            <div>
              <h2 id="todo-list" style={styles.sectionHeading}>
                Your tasks
              </h2>
              <p style={styles.meta}>
                {stats.total === 0
                  ? 'No tasks yet — add your first one above.'
                  : `${stats.active} active • ${stats.completed} completed`}
              </p>
            </div>
          </header>
          <ul style={styles.list}>
            {todos.map((todo) => {
              const isEditing = editingId === todo.id;
              return (
                <li key={todo.id} style={styles.listItem}>
                  <div style={styles.itemMain}>
                    <input
                      type="checkbox"
                      checked={todo.isCompleted}
                      onChange={() => handleToggle(todo.id)}
                      aria-label={todo.isCompleted ? 'Mark as active' : 'Mark as done'}
                    />

                    {isEditing ? (
                      <input
                        value={editingDraft}
                        onChange={(event) => setEditingDraft(event.target.value)}
                        onKeyDown={(event) => {
                          if (event.key === 'Enter') {
                            saveEditing(todo.id);
                          }
                          if (event.key === 'Escape') {
                            cancelEditing();
                          }
                        }}
                        autoFocus
                        style={styles.editInput}
                      />
                    ) : (
                      <span
                        style={{
                          ...styles.title,
                          textDecoration: todo.isCompleted ? 'line-through' : 'none',
                          color: todo.isCompleted ? '#6b7280' : '#202124',
                        }}
                      >
                        {todo.title}
                      </span>
                    )}
                  </div>

                  <div style={styles.actions}>
                    {isEditing ? (
                      <>
                        <button
                          type="button"
                          onClick={() => saveEditing(todo.id)}
                          style={styles.secondaryButton}
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          onClick={cancelEditing}
                          style={styles.ghostButton}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        onClick={() => startEditing(todo)}
                        style={styles.secondaryButton}
                      >
                        Edit
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => handleDelete(todo.id)}
                      style={styles.dangerButton}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      </main>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    padding: '3rem 1rem',
    background: 'linear-gradient(180deg, #f0f4ff 0%, #f4f5f7 100%)',
    display: 'flex',
    justifyContent: 'center',
  },
  main: {
    width: '100%',
    maxWidth: '720px',
    display: 'grid',
    gap: '1.5rem',
  },
  heading: {
    fontSize: '2.75rem',
    margin: 0,
  },
  subheading: {
    marginTop: '0.5rem',
    color: '#4b5563',
    fontSize: '1rem',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '1rem',
    padding: '1.5rem',
    boxShadow:
      '0 18px 50px -25px rgba(30, 64, 175, 0.25), 0 10px 30px -15px rgba(15, 23, 42, 0.2)',
  },
  sectionHeading: {
    fontSize: '1.25rem',
    margin: '0 0 0.75rem',
  },
  form: {
    display: 'flex',
    gap: '0.75rem',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    padding: '0.75rem 1rem',
    borderRadius: '0.75rem',
    border: '1px solid #d1d5db',
    fontSize: '1rem',
    outline: 'none',
  },
  editInput: {
    flex: 1,
    padding: '0.5rem 0.75rem',
    borderRadius: '0.5rem',
    border: '1px solid #d1d5db',
    fontSize: '1rem',
  },
  primaryButton: {
    padding: '0.75rem 1.5rem',
    borderRadius: '0.75rem',
    border: 'none',
    backgroundColor: '#4338ca',
    color: '#ffffff',
    fontWeight: 600,
    cursor: 'pointer',
  },
  secondaryButton: {
    padding: '0.5rem 1rem',
    borderRadius: '0.5rem',
    border: '1px solid #4f46e5',
    backgroundColor: '#eef2ff',
    color: '#3730a3',
    fontWeight: 500,
    cursor: 'pointer',
  },
  ghostButton: {
    padding: '0.5rem 1rem',
    borderRadius: '0.5rem',
    border: 'none',
    backgroundColor: 'transparent',
    color: '#4b5563',
    cursor: 'pointer',
  },
  dangerButton: {
    padding: '0.5rem 1rem',
    borderRadius: '0.5rem',
    border: '1px solid #f87171',
    backgroundColor: '#fee2e2',
    color: '#b91c1c',
    fontWeight: 500,
    cursor: 'pointer',
  },
  list: {
    margin: 0,
    padding: 0,
    listStyle: 'none',
    display: 'grid',
    gap: '1rem',
  },
  listItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '1rem',
    padding: '0.75rem 1rem',
    borderRadius: '0.75rem',
    border: '1px solid #e5e7eb',
    backgroundColor: '#f9fafb',
  },
  itemMain: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    flex: 1,
  },
  actions: {
    display: 'flex',
    gap: '0.5rem',
  },
  title: {
    fontSize: '1rem',
    fontWeight: 500,
  },
  listHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
  },
  meta: {
    margin: 0,
    color: '#6b7280',
    fontSize: '0.95rem',
  },
  visuallyHidden: {
    position: 'absolute',
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: '1px',
    width: '1px',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
};

export default App;
