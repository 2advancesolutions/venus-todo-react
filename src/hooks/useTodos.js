import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY = 'venus-todos';

const loadFromStorage = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const saveToStorage = (todos) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  } catch {
    /* ignore */
  }
};

const defaultTodos = [
  { id: uuidv4(), text: 'Design a sleek UI 🎨', completed: false, createdAt: Date.now() - 7200000 },
  { id: uuidv4(), text: 'Build drag & drop feature 🖱️', completed: false, createdAt: Date.now() - 3600000 },
  { id: uuidv4(), text: 'Write unit tests ✅', completed: true, createdAt: Date.now() - 1800000 },
];

export function useTodos() {
  const [todos, setTodos] = useState(() => loadFromStorage() ?? defaultTodos);

  const persist = useCallback((updater) => {
    setTodos((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      saveToStorage(next);
      return next;
    });
  }, []);

  const addTodo = useCallback((text) => {
    const trimmed = text.trim();
    if (!trimmed) return false;
    persist((prev) => [
      { id: uuidv4(), text: trimmed, completed: false, createdAt: Date.now() },
      ...prev,
    ]);
    return true;
  }, [persist]);

  const updateTodo = useCallback((id, text) => {
    const trimmed = text.trim();
    if (!trimmed) return false;
    persist((prev) =>
      prev.map((t) => (t.id === id ? { ...t, text: trimmed } : t))
    );
    return true;
  }, [persist]);

  const deleteTodo = useCallback((id) => {
    persist((prev) => prev.filter((t) => t.id !== id));
  }, [persist]);

  const completeTodo = useCallback((id) => {
    persist((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: true } : t))
    );
  }, [persist]);

  const uncompleteTodo = useCallback((id) => {
    persist((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: false } : t))
    );
  }, [persist]);

  const clearCompleted = useCallback(() => {
    persist((prev) => prev.filter((t) => !t.completed));
  }, [persist]);

  const pending = todos.filter((t) => !t.completed);
  const completed = todos.filter((t) => t.completed);

  return {
    todos,
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
