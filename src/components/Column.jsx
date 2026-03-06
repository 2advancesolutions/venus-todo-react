import PropTypes from 'prop-types';
import TaskCard from './TaskCard.jsx';

const DATA_FORMAT = 'application/x-venus-task';

function Column({
  id,
  title,
  tasks,
  onDrop,
  onDragOver,
  onDragLeave,
  onDragStart,
  onDragEnd,
  onDeleteTask,
  onUpdateTask,
  isHighlighted,
}) {
  const handleDrop = (event) => {
    onDrop(event, id);
  };

  return (
    <section
      className={`flex h-full min-h-[28rem] flex-1 flex-col rounded-xl border border-slate-700/60 bg-surface/80 backdrop-blur transition-shadow ${
        isHighlighted
          ? 'shadow-[0_0_0_2px] shadow-accent/70'
          : 'shadow-[0_5px_25px_-12px_rgba(56,189,248,0.45)]'
      }`}
      onDragOver={(event) => onDragOver(event, id)}
      onDragLeave={(event) => onDragLeave(event, id)}
      onDrop={handleDrop}
    >
      <header className="flex items-center justify-between gap-2 border-b border-slate-600/40 px-5 py-4">
        <h2 className="text-lg font-semibold tracking-wide text-slate-100">
          {title}
        </h2>
        <span className="rounded-full bg-slate-700/70 px-3 py-1 text-sm font-medium text-slate-300">
          {tasks.length}
        </span>
      </header>
      <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-5 py-5">
        {tasks.length === 0 ? (
          <p className="rounded-lg border border-dashed border-slate-600/80 bg-slate-800/40 px-4 py-8 text-center text-sm text-slate-400">
            Drag tasks here to {id === 'done' ? 'mark them complete' : 'start working on them'}.
          </p>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              columnId={id}
              task={task}
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
              onDeleteTask={onDeleteTask}
              onUpdateTask={onUpdateTask}
              dataFormat={DATA_FORMAT}
            />
          ))
        )}
      </div>
    </section>
  );
}

Column.propTypes = {
  id: PropTypes.oneOf(['todo', 'done']).isRequired,
  title: PropTypes.string.isRequired,
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      status: PropTypes.oneOf(['todo', 'done']).isRequired,
    }),
  ).isRequired,
  onDrop: PropTypes.func.isRequired,
  onDragOver: PropTypes.func.isRequired,
  onDragLeave: PropTypes.func.isRequired,
  onDragStart: PropTypes.func.isRequired,
  onDragEnd: PropTypes.func.isRequired,
  onDeleteTask: PropTypes.func.isRequired,
  onUpdateTask: PropTypes.func.isRequired,
  isHighlighted: PropTypes.bool,
};

Column.defaultProps = {
  isHighlighted: false,
};

export default Column;
export { DATA_FORMAT };
