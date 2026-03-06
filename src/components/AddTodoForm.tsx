import { useState, FormEvent } from 'react'
import { TodoItem } from '../types'

interface Props {
  onAdd: (text: string, priority: TodoItem['priority']) => void
}

const priorities: { value: TodoItem['priority']; label: string; color: string }[] = [
  { value: 'low', label: 'Low', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' },
  { value: 'medium', label: 'Medium', color: 'bg-amber-500/20 text-amber-300 border-amber-500/40' },
  { value: 'high', label: 'High', color: 'bg-rose-500/20 text-rose-300 border-rose-500/40' },
]

export default function AddTodoForm({ onAdd }: Props) {
  const [text, setText] = useState('')
  const [priority, setPriority] = useState<TodoItem['priority']>('medium')
  const [focused, setFocused] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!text.trim()) return
    onAdd(text, priority)
    setText('')
  }

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className={`rounded-2xl border transition-all duration-200 ${focused ? 'border-purple-500/60 shadow-lg shadow-purple-500/10' : 'border-white/10'} bg-white/5 backdrop-blur-sm p-4`}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="What needs to be done? ✍️"
          className="w-full bg-transparent text-white placeholder-slate-400 text-base outline-none mb-3"
          autoComplete="off"
        />
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex gap-2">
            {priorities.map((p) => (
              <button
                key={p.value}
                type="button"
                onClick={() => setPriority(p.value)}
                className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all duration-150 ${p.color} ${
                  priority === p.value ? 'ring-2 ring-white/30 scale-105' : 'opacity-50 hover:opacity-80'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
          <button
            type="submit"
            disabled={!text.trim()}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold transition-all duration-150 active:scale-95"
          >
            <span>+ Add Task</span>
          </button>
        </div>
      </div>
    </form>
  )
}
