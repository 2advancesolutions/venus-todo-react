import { useMemo, useState } from 'react';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import { Todo } from './types/todo';

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => []);

  const addTodo = (text: string) => {
    setTodos((previous) => [
      ...previous,
      {
        id: crypto.randomUUID(),
        text,
        completed: false,
        createdAt: new Date(),
      },
    ]);
  };

  const toggleTodo = (id: string) => {
    setTodos((previous) =>
      previous.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const updateTodo = (id: string, text: string) => {
    setTodos((previous) =>
      previous.map((todo) => (todo.id === id ? { ...todo, text } : todo)),
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((previous) => previous.filter((todo) => todo.id !== id));
  };

  const sortedTodos = useMemo(
    () => [...todos].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()),
    [todos],
  );

  const remainingCount = useMemo(
    () => sortedTodos.filter((todo) => !todo.completed).length,
    [sortedTodos],
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-3 text-center">
          Venus Todo App
        </h1>
        <p className="text-center text-gray-600 mb-8">
          {remainingCount === 0
            ? 'All tasks complete — great job!'
            : `${remainingCount} task${remainingCount === 1 ? '' : 's'} remaining`}
        </p>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <TodoForm onAdd={addTodo} />
          <TodoList
            todos={sortedTodos}
            onToggle={toggleTodo}
            onUpdate={updateTodo}
            onDelete={deleteTodo}
          />
          {sortedTodos.length === 0 && (
            <p className="text-center text-gray-400 py-8">No todos yet. Add one above!</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
