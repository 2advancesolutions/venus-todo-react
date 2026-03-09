import { useState } from 'react'

interface TodoInputProps {
  onAddTodo: (text: string) => void
}

export default function TodoInput({ onAddTodo }: TodoInputProps) {
  const [text, setText] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (text.trim()) {
      onAddTodo(text.trim())
      setText('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new todo..."
        className="input flex-1"
      />
      <button type="submit" className="btn btn-primary">
        Add Todo
      </button>
    </form>
  )
}