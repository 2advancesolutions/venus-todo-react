import React from 'react';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { useTodos } from './hooks/useTodos';

function App() {
  const { todos, addTodo, updateTodo, deleteTodo, toggleTodo } = useTodos();

  const handleUpdate = (id: string, text: string) => {
    updateTodo(id, { text });
  };

  return (
    <div className="todo-container">
      <h1>Venus Todo</h1>
      <TodoForm onAdd={addTodo} />
      <TodoList
        todos={todos}
        onUpdate={handleUpdate}
        onDelete={deleteTodo}
        onToggle={toggleTodo}
      />
    </div>
  );
}

export default App;