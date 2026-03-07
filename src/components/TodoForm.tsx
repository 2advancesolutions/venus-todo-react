import { useState } from 'react';
import { Todo, TodoFilter } from '../types/todo';
import { TodoInput } from './TodoInput';
import { TodoList } from './TodoList';

interface TodoFormProps {
  todos: Todo[];
  onAdd: (text: string) => void;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
  onClearCompleted: () => void;
}

export function TodoForm({ 
  todos, 
  onAdd, 
  onToggle, 
  onDelete, 
  onEdit, 
  onClearCompleted 
}: TodoFormProps) {
  const [filter, setFilter] = useState<TodoFilter>('all');

  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return true;
    }
  });

  const activeCount = todos.filter(todo => !todo.completed).length;
  const completedCount = todos.filter(todo => todo.completed).length;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">My Todos</h1>
        
        <div className="mb-6">
          <TodoInput onAdd={onAdd} />
        </div>

        {todos.length > 0 && (
          <>
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'all'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All ({todos.length})
              </button>
              <button
                onClick={() => setFilter('active')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'active'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Active ({activeCount})
              </button>
              <button
                onClick={() => setFilter('completed')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'completed'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Completed ({completedCount})
              </button>
            </div>

            <TodoList
              todos={filteredTodos}
              onToggle={onToggle}
              onDelete={onDelete}
              onEdit={onEdit}
            />

            {completedCount > 0 && (
              <div className="mt-6 pt-4 border-t border-gray-200">
                <button
                  onClick={onClearCompleted}
                  className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
                >
                  Clear Completed ({completedCount})
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}