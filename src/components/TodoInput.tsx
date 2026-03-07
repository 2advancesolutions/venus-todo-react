import { useState } from 'react';

interface TodoInputProps {
  onAdd: (text: string) => void;
  placeholder?: string;
}

export function TodoInput({ onAdd, placeholder = "Add a new todo..." }: TodoInputProps) {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text.trim());
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
        autoFocus
      />
    </form>
  );
}