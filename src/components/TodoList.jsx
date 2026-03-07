import React from 'react'
import TodoItem from './TodoItem'

function TodoList({ todos, onUpdateTodo, onDeleteTodo, onToggleComplete }) {
  if (todos.length === 0) {
    return <div className="empty-state">No tasks yet. Add one above!</div>
  }

  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onUpdateTodo={onUpdateTodo}
          onDeleteTodo={onDeleteTodo}
          onToggleComplete={onToggleComplete}
        />
      ))}
    </ul>
  )
}

export default TodoList