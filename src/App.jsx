import { useMemo, useState } from 'react';
import { nanoid } from 'nanoid';
import TodoForm from './components/TodoForm.jsx';
import TodoSection from './components/TodoSection.jsx';
import TodoItem from './components/TodoItem.jsx';
import './App.css';

const seedTodos = [
  {
    id: nanoid(),
    text: 'Sketch the user journey',
    completed: false,
  },
  {
    id: nanoid(),
    text: 'Wireframe the todo board',
    completed: false,
  },
  {
    id: nanoid(),
    text: 'Share MVP with the team',
    completed: true,
  },
];

function App() {
  const [todos, setTodos] = useState(seedTodos);
  const [draggedTodoId, setDraggedTodoId] = useState(null);

  const activeTodos = useMemo(
    () => todos.filter((todo) => !todo.completed),
    [todos],
  );
  const completedTodos = useMemo(
    () => todos.filter((todo) => todo.completed),
    [todos],
  );

  const handleAddTodo = (text) => {
    const trimmed = text.trim();
    if (!trimmed) {
      return;
    }

    setTodos((prev) => [
      {
        id: nanoid(),
        text: trimmed,
        completed: false,
      },
      ...prev,
    ]);
  };

  const handleUpdateTodo = (id, text) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              text,
            }
          : todo,
      ),
    );
  };

  const handleDeleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const handleToggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              completed: !todo.completed,
            }
          : todo,
      ),
    );
  };

  const handleDragStart = (id) => {
    setDraggedTodoId(id);
  };

  const handleDragEnd = () => {
    setDraggedTodoId(null);
  };

  const handleDropOn = (isCompleted) => {
    if (!draggedTodoId) return;

    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === draggedTodoId
          ? {
              ...todo,
              completed: isCompleted,
            }
          : todo,
      ),
    );
    setDraggedTodoId(null);
  };

  return (
    <div className="app-wrapper">
      <header className="app-header">
        <div className="app-header__content">
          <h1>Venus Todo Board</h1>
          <p className="app-subtitle">
            Capture tasks, drag them to done, and keep momentum going.
          </p>
        </div>
      </header>
      <main className="app-main">
        <section className="composer">
          <TodoForm onAddTodo={handleAddTodo} />
        </section>
        <section className="board" aria-label="Todo board with two columns">
          <TodoSection
            title="In Progress"
            count={activeTodos.length}
            onDropSection={() => handleDropOn(false)}
            emptyMessage="No tasks here yet. Add a todo or drag one back from Done."
          >
            {activeTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onUpdate={handleUpdateTodo}
                onDelete={handleDeleteTodo}
                onToggleComplete={handleToggleTodo}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
              />
            ))}
          </TodoSection>
          <TodoSection
            title="Completed"
            count={completedTodos.length}
            onDropSection={() => handleDropOn(true)}
            emptyMessage="Completed tasks will land here. Drag from In Progress to celebrate wins."
          >
            {completedTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onUpdate={handleUpdateTodo}
                onDelete={handleDeleteTodo}
                onToggleComplete={handleToggleTodo}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
              />
            ))}
          </TodoSection>
        </section>
      </main>
    </div>
  );
}

export default App;
