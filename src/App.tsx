import { useState, useMemo } from 'react';
import { Todo, TodoFilter } from './types/todo';
import { TodoInput } from './components/TodoInput';
import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<TodoFilter>('all');

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

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  const activeCount = useMemo(() => 
    todos.filter(todo => !todo.completed).length,
    [todos]
  );

  const completedCount = useMemo(() => 
    todos.filter(todo => todo.completed).length,
    [todos]
  );

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Todo App
        </h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          <TodoInput onAddTodo={addTodo} />
          
          <TodoList
            todos={filteredTodos}
            onUpdateTodo={updateTodo}
            onToggleTodo={toggleTodo}
            onDeleteTodo={deleteTodo}
          />
          
          {todos.length > 0 && (
            <TodoForm
              filter={filter}
              onFilterChange={setFilter}
              onClearCompleted={clearCompleted}
              activeCount={activeCount}
              completedCount={completedCount}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;