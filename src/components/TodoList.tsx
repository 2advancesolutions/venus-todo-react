import React from 'react';
import { useDrop } from 'react-dnd';
import { Todo } from '../types/todo';
import { TodoItem } from './TodoItem';

interface TodoListProps {
  title: string;
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, title: string, description?: string) => void;
  onDrop: (id: string, completed: boolean) => void;
  completedFilter: boolean;
  accentColor?: string;
}

export const TodoList: React.FC<TodoListProps> = ({
  title,
  todos,
  onToggle,
  onDelete,
  onUpdate,
  onDrop,
  completedFilter,
  accentColor = 'indigo',
}) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'todo',
    drop: (item: { id: string; type: string }) => {
      onDrop(item.id, completedFilter);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div className="flex-1">
      <h2 className={`text-xl font-bold text-slate-800 mb-4 flex items-center gap-2`}>
        <span className={`w-3 h-3 rounded-full bg-${accentColor}-500`}></span>
        {title}
        <span className="text-sm font-normal text-slate-500">({todos.length})</span>
      </h2>
      
      <div
        ref={drop}
        className={`min-h-96 rounded-xl border-2 border-dashed transition-all duration-200 ${
          isOver
            ? `border-${accentColor}-400 bg-${accentColor}-50`
            : 'border-slate-300 bg-slate-50'
        } p-4`}
      >
        {todos.length === 0 ? (
          <div className="flex items-center justify-center h-full text-slate-400">
            <div className="text-center">
              <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <p className="text-sm">
                {completedFilter ? 'Drop completed todos here' : 'Drop active todos here'}
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            {todos.map((todo, index) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                index={index}
                onToggle={onToggle}
                onDelete={onDelete}
                onUpdate={onUpdate}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};