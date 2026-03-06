import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function TaskCard({
  columnId,
  task,
  onDragStart,
  onDragEnd,
  onDeleteTask,
  onUpdateTask,
  dataFormat,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);

  useEffect(() => {
    setTitle(task.title);
  }, [task.title]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) {
      setTitle(task.title);
      setIsEditing(false);
      return;
    }
    onUpdateTask(columnId, task.id, { title: trimmed });
    setIsEditing(false);
  };

  return (
    <article
      draggable
      onDragStart={(event) => onDragStart(event, task.id, columnId, dataFormat)}
      onDragEnd={onDragEnd}
      className="group cursor-grab rounded-xl border border-slate-600/60 bg-slate-900/80 p-5 shadow-[0_18px_45px_-24px_rgba(56,189,248,0.55)] ring-1 ring-transparent transition hover:-translate-y-0.5 hover:ring-accent/40 active:cursor-grabbing"
    >
      {isEditing ? (
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <label className="text-xs uppercase tracking-wide text-slate-400">
            Edit Task
          </label>
          <input
            className="w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-sm text-slate-100 outline-none ring-1 ring-transparent transition focus:ring-accent"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            autoFocus
          />
          <div className="flex gap-2 self-end">
            <button
              type="button"
              className="rounded-lg border border-transparent px-3 py-2 text-sm font-semibold text-slate-300 transition hover:border-slate-500 hover:text-slate-100"
              onClick={() => {
                setTitle(task.title);
                setIsEditing(false);
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-accent px-3 py-2 text-sm font-semibold text-slate-900 transition hover:bg-sky-400"
            >
              Save
            </button>
          </div>
        </form>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-base font-semibold text-slate-100">
              {task.title}
            </h3>
            <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
              <button
                type="button"
                className="rounded-md px-2 py-1 text-xs font-semibold uppercase tracking-wide text-amber-300 transition hover:bg-amber-400/10 hover:text-amber-200"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </button>
              <button
                type="button"
                className="rounded-md px-2 py-1 text-xs font-semibold uppercase tracking-wide text-rose-300 transition hover:bg-rose-400/10 hover:text-rose-200"
                onClick={() => onDeleteTask(columnId, task.id)}
              >
                Delete
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between text-xs uppercase tracking-wide text-slate-500">
            <span className="rounded-full border border-slate-600/60 px-2 py-1">
              {task.status === 'done' ? 'Complete' : 'In Progress'}
            </span>
            <span className="text-slate-500/80">Drag to move →</span>
          </div>
        </div>
      )}
    </article>
  );
}

TaskCard.propTypes = {
  columnId: PropTypes.oneOf(['todo', 'done']).isRequired,
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    status: PropTypes.oneOf(['todo', 'done']).isRequired,
  }).isRequired,
  onDragStart: PropTypes.func.isRequired,
  onDragEnd: PropTypes.func.isRequired,
  onDeleteTask: PropTypes.func.isRequired,
  onUpdateTask: PropTypes.func.isRequired,
  dataFormat: PropTypes.string.isRequired,
};

export default TaskCard;
