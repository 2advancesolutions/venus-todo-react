import { useState } from 'react';
import { TodoInput } from './components/TodoInput';
import { TodoList } from './components/TodoList';
import { Todo } from './types/todo';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      createdAt: new Date(),
    };
    setTodos([...todos, newTodo]);
  };

  const updateTodo = (id: string, text: string) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, text } : todo
    ));
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          React Todo App
        </h1>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <TodoInput onAddTodo={addTodo} />
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Your Todos
            </h2>
            <TodoList
              todos={todos}
              onUpdateTodo={updateTodo}
              onToggleTodo={toggleTodo}
              onDeleteTodo={deleteTodo}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;