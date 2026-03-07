import React from 'react'
import TodoItem from './TodoItem'
import { Todo } from '../types/todo'

interface TodoListProps {
  todos: Todo[]
  onUpdateTodo: (id: number, text: string) => void
  onToggleTodo: (id: number) => void
  onDeleteTodo: (id: number) => void
}

const TodoList: React.FC<TodoListProps> = ({ 
  todos, 
  onUpdateTodo, 
  onToggleTodo, 
  onDeleteTodo 
}) {
  if (todos.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">🎯</div>
        <p>No tasks yet! Add one above to get started.</p>
      </div>
    )
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onUpdateTodo={onUpdateTodo}
          onToggleTodo={onToggleTodo}
          onDeleteTodo={onDeleteTodo}
        />
      ))}
    </ul>
  )
}

export default TodoList