import React from 'react';
import { Todo } from '../types/todo';
import { TodoItem } from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  onUpdate: (id: string, text: string) => void;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
}

export const TodoList: React.FC<TodoListProps> = ({ 
  todos, 
  onUpdate, 
  onDelete, 
  onToggle 
}) => {
  if (todos.length === 0) {
    return (
      <div className="empty-state">
        No tasks yet. Add your first task above!
      </div>
    );
  }

  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onUpdate={onUpdate}
          onDelete={onDelete}
          onToggle={onToggle}
        />
      ))}
    </ul>
  );
};