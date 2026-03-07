import React, { useState } from 'react';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent } from '@dnd-kit/core';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import TodoItem from './components/TodoItem';
import TodoForm from './components/TodoForm';
import { Todo } from './types';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
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
    setCompletedTodos(completedTodos.map(todo => 
      todo.id === id ? { ...todo, text } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
    setCompletedTodos(completedTodos.filter(todo => todo.id !== id));
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    // Find which list the active item is in
    const activeInTodos = todos.find(t => t.id === activeId);
    const activeInCompleted = completedTodos.find(t => t.id === activeId);
    
    // Find which list the over item is in
    const overInTodos = todos.find(t => t.id === overId);
    const overInCompleted = completedTodos.find(t => t.id === overId);

    // Handle dropping on containers
    if (overId === 'todos-container' && activeInCompleted) {
      // Move from completed to todos
      const todo = completedTodos.find(t => t.id === activeId);
      if (todo) {
        setCompletedTodos(completedTodos.filter(t => t.id !== activeId));
        setTodos([...todos, { ...todo, completed: false }]);
      }
    } else if (overId === 'completed-container' && activeInTodos) {
      // Move from todos to completed
      const todo = todos.find(t => t.id === activeId);
      if (todo) {
        setTodos(todos.filter(t => t.id !== activeId));
        setCompletedTodos([...completedTodos, { ...todo, completed: true }]);
      }
    } else if (overInTodos && activeInTodos) {
      // Reorder within todos
      setTodos(arrayMove(todos, 
        todos.findIndex(t => t.id === activeId),
        todos.findIndex(t => t.id === overId)
      ));
    } else if (overInCompleted && activeInCompleted) {
      // Reorder within completed
      setCompletedTodos(arrayMove(completedTodos,
        completedTodos.findIndex(t => t.id === activeId),
        completedTodos.findIndex(t => t.id === overId)
      ));
    }

    setActiveId(null);
  };

  const activeTodo = [...todos, ...completedTodos].find(t => t.id === activeId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8 mt-8">
          Venus Todo App
        </h1>
        
        <TodoForm onAddTodo={addTodo} />

        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
            {/* Active Todos */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-2xl">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Active Tasks ({todos.length})
              </h2>
              <div 
                id="todos-container"
                className="min-h-[200px] space-y-3"
              >
                <SortableContext items={todos.map(t => t.id)}>
                  {todos.map((todo) => (
                    <TodoItem
                      key={todo.id}
                      todo={todo}
                      onUpdate={updateTodo}
                      onDelete={deleteTodo}
                    />
                  ))}
                </SortableContext>
                {todos.length === 0 && (
                  <p className="text-white/70 text-center py-8">
                    Drag completed tasks here or add new ones above
                  </p>
                )}
              </div>
            </div>

            {/* Completed Todos */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-2xl">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Completed Tasks ({completedTodos.length})
              </h2>
              <div 
                id="completed-container"
                className="min-h-[200px] space-y-3"
              >
                <SortableContext items={completedTodos.map(t => t.id)}>
                  {completedTodos.map((todo) => (
                    <TodoItem
                      key={todo.id}
                      todo={todo}
                      onUpdate={updateTodo}
                      onDelete={deleteTodo}
                    />
                  ))}
                </SortableContext>
                {completedTodos.length === 0 && (
                  <p className="text-white/70 text-center py-8">
                    Drag tasks here to mark as complete
                  </p>
                )}
              </div>
            </div>
          </div>

          <DragOverlay>
            {activeTodo ? (
              <div className="opacity-80">
                <TodoItem
                  todo={activeTodo}
                  onUpdate={updateTodo}
                  onDelete={deleteTodo}
                />
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
}

export default App;