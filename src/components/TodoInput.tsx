import { useState } from 'react'

interface TodoInputProps {
  onAdd: (text: string) => void
  placeholder?: string
}

export function TodoInput({ onAdd, placeholder = "Add a new todo..." }: TodoInputProps) {
  const [text, setText] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (text.trim()) {
      onAdd(text.trim())
      setText('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={placeholder}
        className="input-field flex-1"
        maxLength={200}
      />
      <button type="submit" className="btn-primary px-6">
        Add
      </button>
    </form>
  )
}