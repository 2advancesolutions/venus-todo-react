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
    <form onSubmit={handleSubmit} className="todo-form">
      <label htmlFor="todo-input" className="visually-hidden">
        Add a new todo
      </label>
      <input
        id="todo-input"
        name="todo"
        type="text"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="What would you like to get done?"
        className="todo-input"
        autoComplete="off"
        aria-label="Todo description"
      />
      <button type="submit" className="button button--primary" disabled={isDisabled}>
        Add todo
      </button>
    </form>
  );
}
