import { Todo } from '../types/Todo'
import TodoItem from './TodoItem'

interface TodoListProps {
  todos: Todo[]
  onDeleteTodo: (id: number) => void
  onUpdateTodo: (id: number, text: string) => void
  onToggleTodo: (id: number) => void
}

function TodoList({ todos, onDeleteTodo, onUpdateTodo, onToggleTodo }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="empty-state">
        <p>No todos yet! Add one above to get started.</p>
      </div>
    )
  }

  return (
    <div className="todo-list">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDelete={onDeleteTodo}
          onUpdate={onUpdateTodo}
          onToggle={onToggleTodo}
        />
      ))}
    </div>
  )
}

export default TodoList