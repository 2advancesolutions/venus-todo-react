import { useState, useCallback } from 'react'
import { TodoItem, Status } from './types'

const STORAGE_KEY = 'venus-todos'

function loadFromStorage(): TodoItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : defaultTodos()
  } catch {
    return defaultTodos()
  }
}

function defaultTodos(): TodoItem[] {
  return [
    { id: crypto.randomUUID(), text: 'Build a todo app 🚀', status: 'todo', createdAt: Date.now() - 3000, priority: 'high',   order: 0 },
    { id: crypto.randomUUID(), text: 'Style it with Tailwind CSS',    status: 'todo', createdAt: Date.now() - 2000, priority: 'medium', order: 1 },
    { id: crypto.randomUUID(), text: 'Add drag & drop support',       status: 'done', createdAt: Date.now() - 1000, priority: 'high',   order: 2 },
  ]
}

function save(todos: TodoItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
}

type Updater = TodoItem[] | ((prev: TodoItem[]) => TodoItem[])

export function useTodos() {
  const [todos, setTodos] = useState<TodoItem[]>(loadFromStorage)

  const update = useCallback((updater: Updater) => {
    setTodos((prev: TodoItem[]) => {
      const next: TodoItem[] = typeof updater === 'function' ? updater(prev) : updater
      save(next)
      return next
    })
  }, [])

  const addTodo = useCallback((text: string, priority: TodoItem['priority']) => {
    const item: TodoItem = {
      id: crypto.randomUUID(),
      text: text.trim(),
      status: 'todo',
      createdAt: Date.now(),
      priority,
      order: Date.now(),
    }
    update((prev: TodoItem[]) => [item, ...prev])
  }, [update])

  const updateTodo = useCallback((id: string, text: string, priority: TodoItem['priority']) => {
    update((prev: TodoItem[]) =>
      prev.map((t: TodoItem) => (t.id === id ? { ...t, text: text.trim(), priority } : t))
    )
  }, [update])

  const deleteTodo = useCallback((id: string) => {
    update((prev: TodoItem[]) => prev.filter((t: TodoItem) => t.id !== id))
  }, [update])

  const moveTodo = useCallback((id: string, status: Status) => {
    update((prev: TodoItem[]) =>
      prev.map((t: TodoItem) => (t.id === id ? { ...t, status } : t))
    )
  }, [update])

  const reorderTodos = useCallback((orderedIds: string[]) => {
    update((prev: TodoItem[]) => {
      const map = new Map<string, TodoItem>(prev.map((t: TodoItem) => [t.id, t]))
      return orderedIds
        .map((id, index) => {
          const item = map.get(id)
          return item ? { ...item, order: index } : null
        })
        .filter((t): t is TodoItem => t !== null)
    })
  }, [update])

  return { todos, addTodo, updateTodo, deleteTodo, moveTodo, reorderTodos }
}
