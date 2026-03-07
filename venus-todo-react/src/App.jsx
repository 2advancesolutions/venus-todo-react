import { useEffect, useMemo, useState } from 'react'
import './App.css'

const STORAGE_KEY = 'venus_todo_items'

function createTodo(label) {
  return {
    id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
    label,
    completed: false,
    createdAt: new Date().toISOString(),
  }
}

function App() {
  const [todos, setTodos] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch (error) {
      console.warn('Failed to load todos from storage', error)
      return []
    }
  })
  const [draft, setDraft] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editingDraft, setEditingDraft] = useState('')
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  const visibleTodos = useMemo(() => {
    if (filter === 'active') {
      return todos.filter((todo) => !todo.completed)
    }
    if (filter === 'completed') {
      return todos.filter((todo) => todo.completed)
    }
    return todos
  }, [todos, filter])

  const remainingCount = useMemo(
    () => todos.filter((todo) => !todo.completed).length,
    [todos]
  )

  function handleSubmit(event) {
    event.preventDefault()

    const trimmed = draft.trim()
    if (!trimmed) {
      return
    }

    setTodos((prev) => [createTodo(trimmed), ...prev])
    setDraft('')
  }

  function startEditing(id, currentLabel) {
    setEditingId(id)
    setEditingDraft(currentLabel)
  }

  function cancelEditing() {
    setEditingId(null)
    setEditingDraft('')
  }

  function handleEditSubmit(event) {
    event.preventDefault()

    const trimmed = editingDraft.trim()
    if (!trimmed) {
      cancelEditing()
      return
    }

    setTodos((prev) =>
      prev.map((todo) => {
        if (todo.id === editingId) {
          return { ...todo, label: trimmed }
        }
        return todo
      })
    )
    cancelEditing()
  }

  function toggleTodo(id) {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  function handleDelete(id) {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))

    if (editingId === id) {
      cancelEditing()
    }
  }

  function clearCompleted() {
    setTodos((prev) => prev.filter((todo) => !todo.completed))
  }

  return (
    <div className="app">
      <header className="app__header">
        <h1>Venus Todo</h1>
        <p className="app__subtitle">
          A focused task list with add, update, and delete controls.
        </p>
      </header>

      <main className="app__main">
        <section className="card">
          <form className="todo-form" onSubmit={handleSubmit}>
            <label htmlFor="todo-input" className="todo-form__label">
              Add a task
            </label>
            <div className="todo-form__controls">
              <input
                id="todo-input"
                type="text"
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                placeholder="What do you need to get done?"
                className="todo-form__input"
              />
              <button type="submit" className="todo-form__submit" disabled={!draft.trim()}>
                Add
              </button>
            </div>
          </form>

          <div className="todo-toolbar" role="toolbar" aria-label="Todo filters">
            <span className="todo-toolbar__count">
              {remainingCount} {remainingCount === 1 ? 'task' : 'tasks'} remaining
            </span>
            <div className="todo-toolbar__filters">
              <button
                type="button"
                className={filter === 'all' ? 'is-active' : ''}
                onClick={() => setFilter('all')}
              >
                All
              </button>
              <button
                type="button"
                className={filter === 'active' ? 'is-active' : ''}
                onClick={() => setFilter('active')}
              >
                Active
              </button>
              <button
                type="button"
                className={filter === 'completed' ? 'is-active' : ''}
                onClick={() => setFilter('completed')}
              >
                Completed
              </button>
            </div>
            <button
              type="button"
              className="todo-toolbar__clear"
              onClick={clearCompleted}
              disabled={!todos.some((todo) => todo.completed)}
            >
              Clear completed
            </button>
          </div>

          {todos.length === 0 ? (
            <p className="empty-state">No tasks yet. Add your first task above.</p>
          ) : visibleTodos.length === 0 ? (
            <p className="empty-state">Nothing to show for this filter.</p>
          ) : (
            <ul className="todo-list" aria-live="polite">
              {visibleTodos.map((todo) => (
                <li key={todo.id} className={todo.completed ? 'todo todo--completed' : 'todo'}>
                  <div className="todo__main">
                    <input
                      id={`toggle-${todo.id}`}
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleTodo(todo.id)}
                      aria-label={todo.completed ? `Mark ${todo.label} as incomplete` : `Mark ${todo.label} as complete`}
                    />

                    {editingId === todo.id ? (
                      <form className="todo__edit" onSubmit={handleEditSubmit}>
                        <input
                          autoFocus
                          type="text"
                          value={editingDraft}
                          onChange={(event) => setEditingDraft(event.target.value)}
                          className="todo__edit-input"
                        />
                        <button
                          type="submit"
                          className="todo__save"
                          disabled={!editingDraft.trim()}
                        >
                          Save
                        </button>
                        <button type="button" className="todo__cancel" onClick={cancelEditing}>
                          Cancel
                        </button>
                      </form>
                    ) : (
                      <label htmlFor={`toggle-${todo.id}`} className="todo__label">
                        {todo.label}
                      </label>
                    )}
                  </div>

                  {editingId !== todo.id && (
                    <div className="todo__actions">
                      <button type="button" onClick={() => startEditing(todo.id, todo.label)}>
                        Edit
                      </button>
                      <button type="button" onClick={() => handleDelete(todo.id)} className="danger">
                        Delete
                      </button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>

      <footer className="app__footer">
        <p>
          Built with React and Vite. Todos are stored locally in your browser.
        </p>
      </footer>
    </div>
  )
}

export default App
