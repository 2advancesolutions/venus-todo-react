import { TodoFilter } from '../types/todo';

interface TodoFormProps {
  filter: TodoFilter;
  onFilterChange: (filter: TodoFilter) => void;
  onClearCompleted: () => void;
  activeCount: number;
  completedCount: number;
}

export function TodoForm({ filter, onFilterChange, onClearCompleted, activeCount, completedCount }: TodoFormProps) {
  const filters: { value: TodoFilter; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' },
  ];

  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
      <span className="text-sm text-gray-600">
        {activeCount} {activeCount === 1 ? 'item' : 'items'} left
      </span>
      
      <div className="flex gap-2">
        {filters.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => onFilterChange(value)}
            className={`px-3 py-1 text-sm rounded transition-colors ${
              filter === value
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {completedCount > 0 && (
        <button
          onClick={onClearCompleted}
          className="text-sm text-red-600 hover:text-red-800 transition-colors"
        >
          Clear completed
        </button>
      )}
    </div>
  );
}