import { useMemo, useState } from 'react';
import Column, { DATA_FORMAT } from './components/Column.jsx';

const INITIAL_TASKS = [
  'Sketch product onboarding flow',
  'Draft copy for marketing email',
  'Review analytics dashboard',
];

function generateId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

const createSeedData = () => ({
  todo: INITIAL_TASKS.map((title) => ({
    id: generateId(),
    title,
    status: 'todo',
  })),
  done: [
    {
      id: generateId(),
      title: 'Plan sprint goals',
      status: 'done',
    },
  ],
});

function App() {
  const [columns, setColumns] = useState(createSeedData);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [draggedTaskId, setDraggedTaskId] = useState(null);
  const [activeDropColumn, setActiveDropColumn] = useState(null);

  const columnConfig = useMemo(
    () => [
      { id: 'todo', title: 'In Progress' },
      { id: 'done', title: 'Completed' },
    ],
    [],
  );

  const handleAddTask = (event) => {
    event.preventDefault();
    const trimmed = newTaskTitle.trim();
    if (!trimmed) return;

    setColumns((prev) => ({
      ...prev,
      todo: [
        {
          id: generateId(),
          title: trimmed,
          status: 'todo',
        },
        ...prev.todo,
      ],
    }));
    setNewTaskTitle('');
  };

  const handleDeleteTask = (columnId, taskId) => {
    setColumns((prev) => ({
      ...prev,
      [columnId]: prev[columnId].filter((task) => task.id !== taskId),
    }));
  };

  const handleUpdateTask = (columnId, taskId, updates) => {
    setColumns((prev) => ({
      ...prev,
      [columnId]: prev[columnId].map((task) =>
        task.id === taskId
          ? {
              ...task,
              ...updates,
            }
          : task,
      ),
    }));
  };

  const handleDragStart = (event, taskId, columnId, format) => {
    setDraggedTaskId(taskId);
    const payload = JSON.stringify({ taskId, from: columnId });
    event.dataTransfer.setData(format, payload);
    event.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnd = () => {
    setDraggedTaskId(null);
    setActiveDropColumn(null);
  };

  const handleDragOver = (event, columnId) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
    setActiveDropColumn(columnId);
  };

  const handleDragLeave = () => {
    setActiveDropColumn(null);
  };

  const handleDrop = (event, destinationColumn) => {
    event.preventDefault();
    const data = event.dataTransfer.getData(DATA_FORMAT);
    if (!data) return;

    const { taskId, from } = JSON.parse(data);
    setActiveDropColumn(null);
    setDraggedTaskId(null);

    setColumns((prev) => {
      if (from === destinationColumn) {
        return prev;
      }
      const taskToMove = prev[from].find((task) => task.id === taskId);
      if (!taskToMove) {
        return prev;
      }
      return {
        ...prev,
        [from]: prev[from].filter((task) => task.id !== taskId),
        [destinationColumn]: [
          {
            ...taskToMove,
            status: destinationColumn,
          },
          ...prev[destinationColumn],
        ],
      };
    });
  };

  const totalTasks = columns.todo.length + columns.done.length;

  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-8 px-6 py-10 sm:gap-12 sm:px-10">
      <header className="flex flex-col gap-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-slate-400">
              Venus Productivity Suite
            </p>
            <h1 className="text-3xl font-semibold text-slate-100 sm:text-4xl">
              Action Board
            </h1
            >
          </div>
          <div className="flex items-center gap-2 rounded-full bg-slate-900/80 px-4 py-2 text-sm text-slate-300">
            <span className="h-2 w-2 rounded-full bg-emerald-400" aria-hidden="true"></span>
            {totalTasks} tasks tracked
          </div>
        </div>
        <form
          onSubmit={handleAddTask}
          className="flex flex-col gap-3 rounded-2xl border border-slate-600/60 bg-slate-900/70 p-6 shadow-[0_25px_55px_-35px_rgba(56,189,248,0.55)] sm:flex-row sm:items-center"
        >
          <label htmlFor="taskTitle" className="sr-only">
            Task title
          </label>
          <input
            id="taskTitle"
            name="taskTitle"
            className="flex-1 rounded-xl border border-transparent bg-slate-800/70 px-4 py-3 text-sm text-slate-100 outline-none ring-1 ring-transparent transition focus:border-accent/60 focus:ring-accent/50"
            placeholder="Add a new task..."
            value={newTaskTitle}
            onChange={(event) => setNewTaskTitle(event.target.value)}
          />
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-sky-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Add Task
          </button>
        </form>
      </header>

      <section className="grid gap-6 md:grid-cols-2">
        {columnConfig.map((column) => (
          <Column
            key={column.id}
            id={column.id}
            title={column.title}
            tasks={columns[column.id]}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDeleteTask={handleDeleteTask}
            onUpdateTask={handleUpdateTask}
            isHighlighted={activeDropColumn === column.id}
          />
        ))}
      </section>
    </main>
  );
}

export default App;
