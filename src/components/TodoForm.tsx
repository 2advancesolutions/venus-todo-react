import { FormEvent, useState } from 'react';

interface TodoFormProps {
  onAdd: (text: string) => void;
}

export default function TodoForm({ onAdd }: TodoFormProps) {
  const [text, setText] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = text.trim();

    if (!trimmed) {
      return;
    }

    onAdd(trimmed);
    setText('');
  };

  const isDisabled = text.trim().length === 0;

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex gap-3">
        <input
          type="text"
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="What would you like to get done?"
          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          autoComplete="off"
        />
        <button 
          type="submit" 
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          disabled={isDisabled}
        >
          Add Todo
        </button>
      </div>
    </form>
  );
}