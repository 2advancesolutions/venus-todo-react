import { useState } from 'react';

function TodoForm({ onSubmit }) {
  const [text, setText] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const value = text.trim();

    if (!value) {
      return;
    }

    onSubmit(value);
    setText('');
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <label htmlFor="todo-input" className="sr-only">
        Add a new todo
      </label>
      <input
        id="todo-input"
        name="todo"
        type="text"
        autoComplete="off"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Add a new todo..."
        aria-label="Add a new todo"
      />
      <button type="submit">Add</button>
    </form>
  );
}

export default TodoForm;
