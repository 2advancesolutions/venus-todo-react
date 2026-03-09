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
        <h1 className="text-4xl font-bold text-gray-800 mb-2 text-center">
          Venus Todo App
        </h1>
        <p className="text-center text-gray-600 mb-8">
          {totalCount > 0 ? `${completedCount} of ${totalCount} completed` : 'Add your first todo!'}
        </p>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <TodoForm onAdd={addTodo} />
          <TodoList 
            todos={todos} 
            onToggle={toggleTodo} 
            onDelete={deleteTodo}
            onUpdate={updateTodo}
          />
          {todos.length === 0 && (
            <div className="text-center py-8">
              <div className="text-gray-400 text-lg mb-2">📝</div>
              <p className="text-gray-400">No todos yet. Add one above!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;