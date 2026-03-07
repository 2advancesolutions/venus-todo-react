import { useState } from 'react';
import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';
import { Todo } from './types';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const activeTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      completed: false,
      createdAt: new Date(),
    };
    setTodos(prev => [...prev, newTodo]);
  };

  const updateTodo = (id: string, text: string) => {
    setTodos(prev => prev.map(todo => 
      todo.id === id ? { ...todo, text } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    // Check if we're dragging between sections
    const isDraggingToCompleted = overId === 'completed-section';
    const isDraggingToActive = overId === 'active-section';

    if (isDraggingToCompleted || isDraggingToActive) {
      setTodos(prev => prev.map(todo => 
        todo.id === activeId 
          ? { ...todo, completed: isDraggingToCompleted }
          : todo
      ));
      return;
    }

    // Check if we're reordering within the same section
    const activeTodo = todos.find(t => t.id === activeId);
    const overTodo = todos.find(t => t.id === overId);

    if (activeTodo && overTodo && activeTodo.completed === overTodo.completed) {
      const sectionTodos = todos.filter(t => t.completed === activeTodo.completed);
      const oldIndex = sectionTodos.findIndex(t => t.id === activeId);
      const newIndex = sectionTodos.findIndex(t => t.id === overId);

      if (oldIndex !== newIndex) {
        const newSectionTodos = arrayMove(sectionTodos, oldIndex, newIndex);
        const otherTodos = todos.filter(t => t.completed !== activeTodo.completed);
        setTodos([...otherTodos, ...newSectionTodos]);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          Venus Todo App
        </h1>
        
        <TodoForm onAddTodo={addTodo} />

        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <div className="grid md:grid-cols-2 gap-8 mt-8">
            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">
                Active Tasks ({activeTodos.length})
              </h2>
              <div
                id="active-section"
                className="space-y-3 min-h-32 p-4 border-2 border-dashed border-white/20 rounded-lg"
              >
                <SortableContext
                  items={activeTodos.map(t => t.id)}
                  strategy={verticalListSortingStrategy}
                >
                  {activeTodos.map(todo => (
                    <TodoItem
                      key={todo.id}
                      todo={todo}
                      onUpdate={updateTodo}
                      onDelete={deleteTodo}
                    />
                  ))}
                </SortableContext>
                {activeTodos.length === 0 && (
                  <p className="text-white/50 text-center py-8">
                    Drag tasks here or add new ones
                  </p>
                )}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">
                Completed Tasks ({completedTodos.length})
              </h2>
              <div
                id="completed-section"
                className="space-y-3 min-h-32 p-4 border-2 border-dashed border-white/20 rounded-lg"
              >
                <SortableContext
                  items={completedTodos.map(t => t.id)}
                  strategy={verticalListSortingStrategy}
                >
                  {completedTodos.map(todo => (
                    <TodoItem
                      key={todo.id}
                      todo={todo}
                      onUpdate={updateTodo}
                      onDelete={deleteTodo}
                    />
                  ))}
                </SortableContext>
                {completedTodos.length === 0 && (
                  <p className="text-white/50 text-center py-8">
                    Drag completed tasks here
                  </p>
                )}
              </div>
            </div>
          </div>
        </DndContext>
      </div>
    </div>
  );
}

export default App;