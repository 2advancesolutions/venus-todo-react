import { useState } from 'react';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import { Todo } from './types/todo';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      completed: false,
      createdAt: new Date(),
    };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  const updateTodo = (id: string, newText: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo))
    );
  };

  const toggleTodo = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Venus Todo App
        </h1>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <TodoForm onAdd={addTodo} />
          <TodoList
            todos={todos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onUpdate={updateTodo}
          />
          {todos.length === 0 && (
            <p className="text-center text-gray-400 py-8">No todos yet. Add one above!</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
