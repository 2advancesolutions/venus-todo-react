import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { useTodos } from './hooks/useTodos';

function App() {
  const { todos, addTodo, updateTodo, deleteTodo, toggleTodo } = useTodos();

  const activeTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  const handleUpdateTodo = (id: string, title: string, description?: string) => {
    updateTodo(id, { title, description });
  };

  const handleDrop = (id: string, completed: boolean) => {
    const todo = todos.find(t => t.id === id);
    if (todo && todo.completed !== completed) {
      toggleTodo(id);
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <header className="text-center mb-8">
            <h1 className="text-4xl font-bold text-slate-800 mb-2">
              Venus Todo
            </h1>
            <p className="text-slate-600">
              Modern drag & drop todo management
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Panel - Add Todo */}
            <div className="lg:col-span-1">
              <TodoForm onAddTodo={addTodo} />
            </div>

            {/* Right Panels - Todo Lists */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <TodoList
                  title="Active Todos"
                  todos={activeTodos}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                  onUpdate={handleUpdateTodo}
                  onDrop={handleDrop}
                  completedFilter={false}
                  accentColor="indigo"
                />
                
                <TodoList
                  title="Completed Todos"
                  todos={completedTodos}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                  onUpdate={handleUpdateTodo}
                  onDrop={handleDrop}
                  completedFilter={true}
                  accentColor="green"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </DndProvider>
  );
}

export default App;