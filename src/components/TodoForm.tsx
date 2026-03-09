import { FormEvent, useId, useState } from 'react';

interface TodoFormProps {
  onAdd: (text: string) => void;
}

export default function TodoForm({ onAdd }: TodoFormProps) {
  const [text, setText] = useState('');
  const inputId = useId();

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
      <label htmlFor={inputId} className="sr-only">
        Add a new todo
      </label>
      <div className="flex gap-2">
        <input
          id={inputId}
          type="text"
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="Add a new todo..."
          className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
        <button
          type="submit"
          disabled={isDisabled}
          className="rounded-lg bg-blue-600 px-6 py-2 font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
        >
          Add
        </button>
      </div>
    </form>
  );
}
