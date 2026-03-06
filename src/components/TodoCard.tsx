import { useState, useRef, DragEvent } from 'react'
import { TodoItem } from '../types'

interface Props {
  item: TodoItem
  onUpdate: (id: string, text: string, priority: TodoItem['priority']) => void
  onDelete: (id: string) => void
  onMove: (id: string, status: 'todo' | 'done') => void
  onDragStart: (e: DragEvent<HTMLDivElement>, id: string) => void
  isDragging: boolean
}

const priorityBadge: Record<TodoItem['priority'], string> = {
  low: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  medium: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  high: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
}

const priorityDot: Record<TodoItem['priority'], string> = {
  low: 'bg-emerald-400',
  medium: 'bg-amber-400',
  high: 'bg-rose-400',
}

const priorities: { value: TodoItem['priority']; label: string }[] = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
]

export default function TodoCard({ item, onUpdate, onDelete, onMove, onDragStart, isDragging }: Props) {
  const [editing, setEditing] = useState(false)
  const [editText, setEditText] = useState(item.text)
  const [editPriority, setEditPriority] = useState<TodoItem['priority']>(item.priority)
  const inputRef = useRef<HTMLInputElement>(null)

  const startEdit = () => {
    setEditText(item.text)
    setEditPriority(item.priority)
    setEditing(true)
    setTimeout(() => inputRef.current?.focus(), 50)
  }

  const saveEdit = () => {
    if (editText.trim()) {
      onUpdate(item.id, editText, editPriority)
    }
    setEditing(false)
  }

  const cancelEdit = () => {
    setEditing(false)
    setEditText(item.text)
    setEditPriority(item.priority)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') saveEdit()
    if (e.key === 'Escape') cancelEdit()
  }

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, item.id)}
      className={`group relative rounded-xl border p-4 transition-all duration-200 cursor-grab active:cursor-grabbing select-none
        ${isDragging
          ? 'opacity-40 scale-95 border-purple-500/50 bg-purple-500/10'
          : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/8 hover:shadow-md hover:shadow-black/20'
        }`}
    >
      {/* Drag handle */}
      <div className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-40 transition-opacity text-slate-400 text-lg pointer-events-none">
        ⠿
      </div>

      {editing ? (
        <div className="space-y-3">
          <input
            ref={inputRef}
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full bg-transparent border-b border-purple-400 text-white text-sm outline-none pb-1"
          />
          <div className="flex items-center gap-2 flex-wrap">
            {priorities.map((p) => (
              <button
                key={p.value}
                onClick={() => setEditPriority(p.value)}
                className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border transition-all ${priorityBadge[p.value]} ${
                  editPriority === p.value ? 'ring-2 ring-white/30 scale-105' : 'opacity-40 hover:opacity-70'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
          <div className="flex gap-2 justify-end">
            <button
              onClick={cancelEdit}
              className="px-3 py-1 rounded-lg text-xs text-slate-400 hover:text-white hover:bg-white/10 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={saveEdit}
              className="px-3 py-1 rounded-lg text-xs bg-purple-600 hover:bg-purple-500 text-white font-semibold transition-all"
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-start gap-3">
          {/* Checkbox */}
          <button
            onClick={() => onMove(item.id, item.status === 'todo' ? 'done' : 'todo')}
            className={`mt-0.5 w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all duration-150
              ${item.status === 'done'
                ? 'bg-purple-500 border-purple-500 text-white'
                : 'border-slate-500 hover:border-purple-400'
              }`}
          >
            {item.status === 'done' && (
              <svg className="w-3 h-3" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2 6l3 3 5-5" />
              </svg>
            )}
          </button>

          <div className="flex-1 min-w-0">
            <p className={`text-sm leading-relaxed break-words ${item.status === 'done' ? 'line-through text-slate-500' : 'text-slate-100'}`}>
              {item.text}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium border ${priorityBadge[item.priority]}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${priorityDot[item.priority]}`} />
                {item.priority}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
            <button
              onClick={startEdit}
              title="Edit"
              className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.5 2.5a2.121 2.121 0 013 3L5 15H1v-4L11.5 2.5z" />
              </svg>
            </button>
            <button
              onClick={() => onDelete(item.id)}
              title="Delete"
              className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-all"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2 4h12M6 4V2h4v2M5 4l.5 9h5L11 4" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
