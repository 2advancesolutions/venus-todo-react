import { useState } from 'react';

function TodoForm({ onAddTodo }) {
  const [value, setValue] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) {
      return;
    }
    onAddTodo(trimmed);
    setValue('');
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <label className="todo-form__label" htmlFor="todo-input">
        Add a new task
      </label>
      <div className="todo-form__controls">
        <input
          id="todo-input"
          type="text"
          placeholder="e.g. Review pull requests"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          autoComplete="off"
        />
        <button type="submit" className="primary-button">
          Add todo
        </button>
      </div>
    </form>
  );
}

export default TodoForm;
