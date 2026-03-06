import React from 'react'

function TodoStats({ todos }) {
  const totalTasks = todos.length
  const completedTasks = todos.filter(todo => todo.completed).length
  const pendingTasks = totalTasks - completedTasks
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  if (totalTasks === 0) {
    return null
  }

  return (
    <div className="todo-stats">
      <p>
        📊 <strong>{totalTasks}</strong> total task{totalTasks !== 1 ? 's' : ''} · 
        <strong>{pendingTasks}</strong> pending · 
        <strong>{completedTasks}</strong> completed
        {completionRate > 0 && (
          <span> · <strong>{completionRate}%</strong> done</span>
        )}
      </p>
    </div>
  )
}

export default TodoStats