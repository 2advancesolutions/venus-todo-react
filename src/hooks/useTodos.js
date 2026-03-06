import { useState, useCallback } from 'react';

const STORAGE_KEY = 'venus_todos';

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function save(todos) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  } catch {}
}

function uid() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export function useTodos() {
  const [todos, setTodos] = useState(loadFromStorage);

  const persist = useCallback((next) => {
    setTodos(next);
    save(next);
  }, []);

  // Returns true on success, false if invalid
  const addTodo = useCallback((text) => {
    const trimmed = text.trim();
    if (!trimmed) return false;
    const next = [
      {
        id: uid(),
        text: trimmed,
        completed: false,
        createdAt: Date.now(),
      },
      ...todos,
    ];
    persist(next);
    return true;
  }, [todos, persist]);

  const updateTodo = useCallback((id, text) => {
    const trimmed = text.trim();
    if (!trimmed) return false;
    const next = todos.map((t) =>
      t.id === id ? { ...t, text: trimmed } : t
    );
    persist(next);
    return true;
  }, [todos, persist]);

  const deleteTodo = useCallback((id) => {
    persist(todos.filter((t) => t.id !== id));
  }, [todos, persist]);

  const completeTodo = useCallback((id) => {
    const next = todos.map((t) =>
      t.id === id ? { ...t, completed: true, completedAt: Date.now() } : t
    );
    persist(next);
  }, [todos, persist]);

  const uncompleteTodo = useCallback((id) => {
    const next = todos.map((t) =>
      t.id === id ? { ...t, completed: false, completedAt: undefined } : t
    );
    persist(next);
  }, [todos, persist]);

  const clearCompleted = useCallback(() => {
    persist(todos.filter((t) => !t.completed));
  }, [todos, persist]);

  const pending = todos.filter((t) => !t.completed);
  const completed = todos.filter((t) => t.completed);

  return {
    pending,
    completed,
    addTodo,
    updateTodo,
    deleteTodo,
    completeTodo,
    uncompleteTodo,
    clearCompleted,
  };
}
