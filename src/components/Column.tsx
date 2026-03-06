import { useState, DragEvent, useRef } from 'react'
import { TodoItem, Status } from '../types'
import TodoCard from './TodoCard'

interface Props {
  title: string
  status: Status
  items: TodoItem[]
  icon: string
  accent: string
  onUpdate: (id: string, text: string, priority: TodoItem['priority']) => void
  onDelete: (id: string) => void
  onMove: (id: string, status: Status) => void
  onReorder: (orderedIds: string[]) => void
  allTodos: TodoItem[]
  draggingId: string | null
  setDraggingId: (id: string | null) => void
}

export default function Column({
  title, status, items, icon, accent,
  onUpdate, onDelete, onMove, onReorder,
  allTodos, draggingId, setDraggingId,
}: Props) {
  const [isDragOver, setIsDragOver] = useState(false)
  const [insertBeforeId, setInsertBeforeId] = useState<string | null>(null)
  const columnRef = useRef<HTMLDivElement>(null)

  const handleDragStart = (e: DragEvent<HTMLDivElement>, id: string) => {
    setDraggingId(id)
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/plain', id)
  }

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    setIsDragOver(true)

    // Determine insert position
    const cards = Array.from(columnRef.current?.querySelectorAll('[data-card-id]') ?? [])
    let insertBefore: string | null = null
    for (const card of cards) {
      const rect = card.getBoundingClientRect()
      if (e.clientY < rect.top + rect.height / 2) {
        insertBefore = card.getAttribute('data-card-id')
        break
      }
    }
    setInsertBeforeId(insertBefore)
  }

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    if (!columnRef.current?.contains(e.relatedTarget as Node)) {
      setIsDragOver(false)
      setInsertBeforeId(null)
    }
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragOver(false)
    setInsertBeforeId(null)
    setDraggingId(null)

    const id = e.dataTransfer.getData('text/plain')
    if (!id) return

    const dragged = allTodos.find((t) => t.id === id)
    if (!dragged) return

    // Move to this column if coming from another
    if (dragged.status !== status) {
      onMove(id, status)
      return
    }

    // Reorder within same column
    const currentIds = items.map((t) => t.id).filter((tid) => tid !== id)
    const insertIdx = insertBeforeId
      ? currentIds.indexOf(insertBeforeId)
      : currentIds.length
    const finalIdx = insertIdx === -1 ? currentIds.length : insertIdx
    currentIds.splice(finalIdx, 0, id)

    // Build full order: current column reordered + other column items unchanged
    const otherIds = allTodos.filter((t) => t.status !== status).map((t) => t.id)
    onReorder([...currentIds, ...otherIds])
  }

  return (
    <div
      ref={columnRef}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`flex flex-col rounded-2xl border transition-all duration-200 min-h-[400px]
        ${isDragOver
          ? `border-${accent}-500/50 bg-${accent}-500/5 shadow-lg shadow-${accent}-500/10`
          : 'border-white/10 bg-white/3'
        }`}
    >
      {/* Column Header */}
      <div className={`flex items-center justify-between px-5 py-4 border-b ${isDragOver ? 'border-white/10' : 'border-white/8'}`}>
        <div className="flex items-center gap-2.5">
          <span className="text-xl">{icon}</span>
          <h2 className="text-white font-semibold text-base tracking-tight">{title}</h2>
          <span className={`ml-1 min-w-[22px] h-[22px] px-1.5 rounded-full text-xs font-bold flex items-center justify-center
            ${status === 'todo' ? 'bg-purple-500/20 text-purple-300' : 'bg-emerald-500/20 text-emerald-300'}`}>
            {items.length}
          </span>
        </div>
      </div>

      {/* Cards */}
      <div className="flex-1 p-4 space-y-2.5 overflow-y-auto scrollbar-thin">
        {items.length === 0 ? (
          <div className={`flex flex-col items-center justify-center h-40 rounded-xl border-2 border-dashed transition-all duration-200
            ${isDragOver ? 'border-purple-400/40 bg-purple-500/5' : 'border-white/10'}`}>
            <p className="text-slate-500 text-sm">
              {isDragOver ? '✨ Drop here' : status === 'todo' ? 'No tasks yet' : 'Nothing done yet'}
            </p>
          </div>
        ) : (
          items.map((item) => (
            <div key={item.id} data-card-id={item.id}>
              {insertBeforeId === item.id && draggingId && (
                <div className="h-1 rounded-full bg-purple-400/60 mb-2 mx-1 animate-pulse" />
              )}
              <TodoCard
                item={item}
                onUpdate={onUpdate}
                onDelete={onDelete}
                onMove={onMove}
                onDragStart={handleDragStart}
                isDragging={draggingId === item.id}
              />
            </div>
          ))
        )}
        {isDragOver && insertBeforeId === null && draggingId && (
          <div className="h-1 rounded-full bg-purple-400/60 animate-pulse mx-1" />
        )}
      </div>
    </div>
  )
}
