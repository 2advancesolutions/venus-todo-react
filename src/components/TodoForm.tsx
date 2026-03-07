import React, { useState } from 'react';

interface TodoFormProps {
  onAddTodo: (title: string, description?: string) => void;
}

export const TodoForm: React.FC<TodoFormProps> = ({ onAddTodo }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAddTodo(title.trim(), description.trim() || undefined);
      setTitle('');
      setDescription('');
      setIsExpanded(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-slate-200">
      <h2 className="text-2xl font-bold text-slate-800 mb-4">Add New Todo</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-2">
            Title *
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What needs to be done?"
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 placeholder:text-slate-400"
            required
          />
        </div>
        
        {isExpanded && (
          <div className="animate-slide-up">
            <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-2">
              Description (optional)
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add more details..."
              rows={3}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 placeholder:text-slate-400 resize-none"
            />
          </div>
        )}
        
        <div className="flex gap-3">
          <button
            type="submit"
            className="flex-1 bg-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Add Todo
          </button>
          
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-4 py-3 text-slate-600 hover:text-slate-800 transition-colors duration-200"
          >
            {isExpanded ? '−' : '+'}
          </button>
        </div>
      </form>
    </div>
  );
};