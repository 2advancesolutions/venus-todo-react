import { useState, KeyboardEvent, ChangeEvent } from 'react';
import { Todo } from './types/todo';
import './App.css';

function App(): JSX.Element {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState<string>('');

  const addTodo = (): void => {
    if (inputValue.trim() === '') return;
    
    const newTodo: Todo = {
      id: Date.now(),
      text: inputValue,
      completed: false
    };
    
    setTodos([...todos, newTodo]);
    setInputValue('');
  };

  const deleteTodo = (id: number): void => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleTodo = (id: number): void => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
  };

  const darkTheme = {
    background: '#0f172a',
    surface: '#1e293b',
    surfaceHover: '#334155',
    border: '#475569',
    text: '#f1f5f9',
    textSecondary: '#94a3b8',
    primary: '#6366f1',
    primaryHover: '#818cf8',
    danger: '#ef4444',
    dangerHover: '#f87171',
    success: '#22c55e'
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: darkTheme.background,
      color: darkTheme.text,
      fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
      padding: '2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '600px',
        backgroundColor: darkTheme.surface,
        borderRadius: '16px',
        padding: '2.5rem',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
        border: `1px solid ${darkTheme.border}`
      }}>
        <h1 style={{
          margin: '0 0 2rem 0',
          fontSize: '2.5rem',
          fontWeight: '700',
          textAlign: 'center',
          background: `linear-gradient(135deg, ${darkTheme.primary}, ${darkTheme.primaryHover})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          Todo App
        </h1>
        
        <div style={{
          display: 'flex',
          gap: '0.75rem',
          marginBottom: '2rem'
        }}>
          <input
            type="text"
            placeholder="Add a new todo..."
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            style={{
              flex: 1,
              padding: '0.875rem 1.25rem',
              backgroundColor: darkTheme.surfaceHover,
              border: `1px solid ${darkTheme.border}`,
              borderRadius: '12px',
              color: darkTheme.text,
              fontSize: '1rem',
              outline: 'none',
              transition: 'border-color 0.2s ease, box-shadow 0.2s ease'
            }}
            onFocus={(e) => {
              const target = e.target as HTMLInputElement;
              target.style.borderColor = darkTheme.primary;
              target.style.boxShadow = `0 0 0 3px ${darkTheme.primary}20`;
            }}
            onBlur={(e) => {
              const target = e.target as HTMLInputElement;
              target.style.borderColor = darkTheme.border;
              target.style.boxShadow = 'none';
            }}
          />
          <button
            onClick={addTodo}
            style={{
              padding: '0.875rem 1.5rem',
              background: `linear-gradient(135deg, ${darkTheme.primary}, ${darkTheme.primaryHover})`,
              border: 'none',
              borderRadius: '12px',
              color: '#ffffff',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              boxShadow: `0 4px 12px ${darkTheme.primary}40`
            }}
            onMouseEnter={(e) => {
              const target = e.target as HTMLButtonElement;
              target.style.transform = 'translateY(-2px)';
              target.style.boxShadow = `0 8px 20px ${darkTheme.primary}60`;
            }}
            onMouseLeave={(e) => {
              const target = e.target as HTMLButtonElement;
              target.style.transform = 'translateY(0)';
              target.style.boxShadow = `0 4px 12px ${darkTheme.primary}40`;
            }}
          >
            Add Todo
          </button>
        </div>

        {todos.length === 0 ? (
          <div style={{
            textAlign: 'center',
            color: darkTheme.textSecondary,
            fontSize: '1.1rem',
            padding: '3rem 1rem'
          }}>
            No todos yet. Add one above! ✨
          </div>
        ) : (
          <ul style={{
            listStyle: 'none',
            margin: 0,
            padding: 0,
            display: 'grid',
            gap: '0.75rem'
          }}>
            {todos.map(todo => (
              <li
                key={todo.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '1rem 1.25rem',
                  backgroundColor: todo.completed ? `${darkTheme.success}15` : darkTheme.surfaceHover,
                  border: `1px solid ${todo.completed ? darkTheme.success : darkTheme.border}`,
                  borderRadius: '12px',
                  transition: 'all 0.2s ease'
                }}
              >
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  flex: 1,
                  cursor: 'pointer'
                }}>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                    style={{
                      width: '1.25rem',
                      height: '1.25rem',
                      accentColor: darkTheme.primary,
                      cursor: 'pointer'
                    }}
                  />
                  <span style={{
                    flex: 1,
                    color: darkTheme.text,
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    opacity: todo.completed ? 0.7 : 1
                  }}>
                    {todo.text}
                  </span>
                </label>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  style={{
                    border: 'none',
                    backgroundColor: 'transparent',
                    color: darkTheme.danger,
                    fontWeight: '600',
                    cursor: 'pointer',
                    padding: '0.5rem 0.75rem',
                    borderRadius: '8px',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    const target = e.target as HTMLButtonElement;
                    target.style.backgroundColor = `${darkTheme.danger}20`;
                    target.style.color = darkTheme.dangerHover;
                  }}
                  onMouseLeave={(e) => {
                    const target = e.target as HTMLButtonElement;
                    target.style.backgroundColor = 'transparent';
                    target.style.color = darkTheme.danger;
                  }}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;