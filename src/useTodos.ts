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
    { id: crypto.randomUUID(), text: 'Build a todo app 🚀', status: 'todo', createdAt: Date.now() - 3000, priority: 'high' },
    { id: crypto.randomUUID(), text: 'Style it with Tailwind CSS', status: 'todo', createdAt: Date.now() - 2000, priority: 'medium' },
    { id: crypto.randomUUID(), text: 'Add drag & drop support', status: 'done', createdAt: Date.now() - 1000, priority: 'high' },
  ]
}

function save(todos: TodoItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
}

export function useTodos() {
  const [todos, setTodos] = useState<TodoItem[]>(loadFromStorage)

  const update = useCallback((next: TodoItem[]) => {
    save(next)
    setTodos(next)
  }, [])

  const addTodo = useCallback((text: string, priority: TodoItem['priority']) => {
    const item: TodoItem = {
      id: crypto.randomUUID(),
      text: text.trim(),
      status: 'todo',
      createdAt: Date.now(),
      priority,
    }
    update((prev) => [item, ...prev])
  }, [update])

  const updateTodo = useCallback((id: string, text: string, priority: TodoItem['priority']) => {
    update((prev) =>
      prev.map((t) => (t.id === id ? { ...t, text: text.trim(), priority } : t))
    )
  }, [update])

  const deleteTodo = useCallback((id: string) => {
    update((prev) => prev.filter((t) => t.id !== id))
  }, [update])

  const moveTodo = useCallback((id: string, status: Status) => {
    update((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status } : t))
    )
  }, [update])

  const reorderTodos = useCallback((orderedIds: string[]) => {
    update((prev) => {
      const map = new Map(prev.map((t) => [t.id, t]))
      return orderedIds.map((id) => map.get(id)!).filter(Boolean)
    })
  }, [update])

  return { todos, addTodo, updateTodo, deleteTodo, moveTodo, reorderTodos }
}
