import { Todo } from '../types/todo'
import TodoItem from './TodoItem'

interface TodoListProps {
  todos: Todo[]
  onUpdate: (id: string, updates: Partial<Pick<Todo, 'text' | 'completed'>>) => void
  onDelete: (id: string) => void
}

export default function TodoList({ todos, onUpdate, onDelete }: TodoListProps) {
  const completedCount = todos.filter(todo => todo.completed).length
  const totalCount = todos.length

  if (todos.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No todos yet. Add one above!</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          {totalCount} {totalCount === 1 ? 'todo' : 'todos'}
        </h2>
        {completedCount > 0 && (
          <p className="text-sm text-gray-600">
            {completedCount} completed
          </p>
        )}
      </div>
      
      <div className="space-y-2">
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  )
}