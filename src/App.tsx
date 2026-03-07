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
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const updateTodo = (id: string, text: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text } : todo
    ));
  };

  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Venus Todo App
        </h1>
        
        <div className="bg-white rounded-xl shadow-lg p-6 mb-4">
          <TodoForm onAdd={addTodo} />
        </div>

        {todos.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-700">Your Todos</h2>
              <span className="text-sm text-gray-500">
                {completedCount} / {totalCount} completed
              </span>
            </div>
            <TodoList 
              todos={todos} 
              onToggle={toggleTodo} 
              onDelete={deleteTodo}
              onUpdate={updateTodo}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;