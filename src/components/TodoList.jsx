import React from 'react'
import TodoItem from './TodoItem'

function TodoList({ todos, onToggleTodo, onUpdateTodo, onDeleteTodo }) {
  if (todos.length === 0) {
    return (
      <div className="empty-state">
        <h3>🎯 No tasks yet!</h3>
        <p>Add your first task above to get started.</p>
      </div>
    )
  }

  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggleTodo}
          onUpdate={onUpdateTodo}
          onDelete={onDeleteTodo}
        />
      ))}
    </ul>
  )
}

export default TodoList