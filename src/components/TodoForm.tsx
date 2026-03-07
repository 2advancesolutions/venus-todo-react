import React, { useState } from 'react';

interface TodoFormProps {
  onAddTodo: (text: string) => void;
}

function TodoForm({ onAddTodo }: TodoFormProps) {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAddTodo(text.trim());
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="flex gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 px-4 py-3 rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
        />
        <button
          type="submit"
          className="px-6 py-3 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-lg transition-all duration-200 backdrop-blur-sm border border-white/20"
        >
          Add
        </button>
      </div>
    </form>
  );
}

export default TodoForm;