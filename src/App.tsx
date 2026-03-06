import { useState } from 'react'
import { useTodos } from './useTodos'
import AddTodoForm from './components/AddTodoForm'
import Column from './components/Column'

export default function App() {
  const { todos, addTodo, updateTodo, deleteTodo, moveTodo, reorderTodos } = useTodos()
  const [draggingId, setDraggingId] = useState<string | null>(null)

  const todoItems = todos.filter((t) => t.status === 'todo')
  const doneItems = todos.filter((t) => t.status === 'done')

  return (
    <div className="min-h-screen px-4 py-10 sm:px-8">
      {/* Header */}
      <header className="max-w-5xl mx-auto mb-10 text-center">
        <div className="inline-flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-2xl bg-purple-600 flex items-center justify-center text-xl shadow-lg shadow-purple-500/30">
            ✅
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Venus <span className="text-purple-400">Todo</span>
          </h1>
        </div>
        <p className="text-slate-400 text-sm">
          Drag tasks between columns · Click the circle to toggle status
        </p>

        {/* Stats */}
        <div className="flex items-center justify-center gap-6 mt-5">
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-400">{todoItems.length}</p>
            <p className="text-xs text-slate-500 uppercase tracking-wider">Pending</p>
          </div>
          <div className="w-px h-8 bg-white/10" />
          <div className="text-center">
            <p className="text-2xl font-bold text-emerald-400">{doneItems.length}</p>
            <p className="text-xs text-slate-500 uppercase tracking-wider">Done</p>
          </div>
          <div className="w-px h-8 bg-white/10" />
          <div className="text-center">
            <p className="text-2xl font-bold text-white">{todos.length}</p>
            <p className="text-xs text-slate-500 uppercase tracking-wider">Total</p>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto">
        {/* Add Form */}
        <AddTodoForm onAdd={addTodo} />

        {/* Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Column
            title="To Do"
            status="todo"
            icon="📋"
            accent="purple"
            items={todoItems}
            onUpdate={updateTodo}
            onDelete={deleteTodo}
            onMove={moveTodo}
            onReorder={reorderTodos}
            allTodos={todos}
            draggingId={draggingId}
            setDraggingId={setDraggingId}
          />
          <Column
            title="Done"
            status="done"
            icon="🎉"
            accent="emerald"
            items={doneItems}
            onUpdate={updateTodo}
            onDelete={deleteTodo}
            onMove={moveTodo}
            onReorder={reorderTodos}
            allTodos={todos}
            draggingId={draggingId}
            setDraggingId={setDraggingId}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-5xl mx-auto mt-12 text-center text-slate-600 text-xs">
        Built with React + Tailwind CSS · Powered by Venus 🌟
      </footer>
    </div>
  )
}
