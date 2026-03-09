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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const isDisabled = text.trim().length === 0;

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:flex-row md:items-center"
    >
      <div className="w-full flex-1">
        <label htmlFor={inputId} className="sr-only">
          Add a todo item
        </label>
        <input
          id={inputId}
          type="text"
          value={text}
          onChange={handleChange}
          placeholder="What do you need to get done?"
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-700 shadow-inner focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-300"
        />
      </div>
      <button
        type="submit"
        disabled={isDisabled}
        className="inline-flex items-center justify-center rounded-xl bg-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-300 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500"
      >
        Add Task
      </button>
    </form>
  );
}
