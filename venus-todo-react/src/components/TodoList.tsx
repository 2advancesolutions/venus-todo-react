import { Todo } from '../types/Todo'
import TodoItem from './TodoItem'

interface TodoListProps {
  todos: Todo[]
  onUpdateTodo: (id: number, text: string) => void
  onDeleteTodo: (id: number) => void
  onToggleTodo: (id: number) => void
}

function TodoList({ todos, onUpdateTodo, onDeleteTodo, onToggleTodo }: TodoListProps) {
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
          onUpdateTodo={onUpdateTodo}
          onDeleteTodo={onDeleteTodo}
          onToggleTodo={onToggleTodo}
        />
      ))}
    </div>
  )
}

export default TodoList