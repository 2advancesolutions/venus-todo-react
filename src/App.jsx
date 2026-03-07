import { useEffect, useMemo, useState } from 'react';

const STATUS = {
  ACTIVE: 'active',
  COMPLETED: 'completed',
};

const createTask = (text) => ({
  id: typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`,
  text,
  status: STATUS.ACTIVE,
  createdAt: Date.now(),
});

const storageKey = 'venus-todo-react/tasks';

function App() {
  const [tasks, setTasks] = useState(() => {
    if (typeof window === 'undefined') return [];
    try {
      const saved = window.localStorage.getItem(storageKey);
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Failed to parse tasks from storage', error);
      return [];
    }
  });
  const [newTaskText, setNewTaskText] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingText, setEditingText] = useState('');
  const [dragTarget, setDragTarget] = useState(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(storageKey, JSON.stringify(tasks));
  }, [tasks]);

  const activeTasks = useMemo(
    () => tasks.filter((task) => task.status === STATUS.ACTIVE),
    [tasks],
  );

  const completedTasks = useMemo(
    () => tasks.filter((task) => task.status === STATUS.COMPLETED),
    [tasks],
  );

  const handleAddTask = (event) => {
    event.preventDefault();
    const text = newTaskText.trim();
    if (!text) return;
    setTasks((prev) => [createTask(text), ...prev]);
    setNewTaskText('');
  };

  const startEditingTask = (taskId, text) => {
    setEditingTaskId(taskId);
    setEditingText(text);
  };

  const cancelEditing = () => {
    setEditingTaskId(null);
    setEditingText('');
  };

  const handleUpdateTask = (event) => {
    event.preventDefault();
    const text = editingText.trim();
    if (!text) {
      cancelEditing();
      return;
    }
    setTasks((prev) =>
      prev.map((task) =>
        task.id === editingTaskId
          ? {
              ...task,
              text,
            }
          : task,
      ),
    );
    cancelEditing();
  };

  const handleDeleteTask = (taskId) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  const toggleTaskStatus = (taskId) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status:
                task.status === STATUS.ACTIVE ? STATUS.COMPLETED : STATUS.ACTIVE,
            }
          : task,
      ),
    );
  };

  const handleDragStart = (event, taskId) => {
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/plain', taskId);
  };

  const handleDragOver = (event, targetStatus) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
    setDragTarget(targetStatus);
  };

  const handleDrop = (event, targetStatus) => {
    event.preventDefault();
    const taskId = event.dataTransfer.getData('text/plain');
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: targetStatus,
              completedAt:
                targetStatus === STATUS.COMPLETED ? Date.now() : task.completedAt,
            }
          : task,
      ),
    );
    setDragTarget(null);
  };

  const handleDragLeave = (targetStatus) => {
    if (dragTarget === targetStatus) {
      setDragTarget(null);
    }
  };

  const renderTask = (task) => {
    const isEditing = editingTaskId === task.id;
    return (
      <li
        key={task.id}
        className={
          task.status === STATUS.COMPLETED
            ? 'task task--completed'
            : 'task'
        }
        draggable
        onDragStart={(event) => handleDragStart(event, task.id)}
      >
        <div className="task__main">
          <input
            type="checkbox"
            checked={task.status === STATUS.COMPLETED}
            onChange={() => toggleTaskStatus(task.id)}
            aria-label={`Mark ${task.text} as ${
              task.status === STATUS.COMPLETED ? 'active' : 'completed'
            }`}
          />
          {isEditing ? (
            <form onSubmit={handleUpdateTask} className="task__edit-form">
              <input
                value={editingText}
                onChange={(event) => setEditingText(event.target.value)}
                autoFocus
                className="task__edit-input"
              />
              <div className="task__edit-actions">
                <button type="submit" className="btn btn--primary">
                  Save
                </button>
                <button type="button" className="btn" onClick={cancelEditing}>
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <span className="task__text">{task.text}</span>
          )}
        </div>
        {!isEditing && (
          <div className="task__actions">
            <button
              type="button"
              className="btn"
              onClick={() => startEditingTask(task.id, task.text)}
            >
              Edit
            </button>
            <button
              type="button"
              className="btn btn--danger"
              onClick={() => handleDeleteTask(task.id)}
            >
              Delete
            </button>
          </div>
        )}
      </li>
    );
  };

  return (
    <div className="app">
      <header className="app__header">
        <h1>Venus Todo Board</h1>
        <p>Drag tasks to mark them complete or reopen them. Edit and delete with ease.</p>
      </header>

      <section className="task-creator">
        <form onSubmit={handleAddTask}>
          <input
            type="text"
            placeholder="What needs to be done?"
            value={newTaskText}
            onChange={(event) => setNewTaskText(event.target.value)}
            aria-label="Add a new task"
          />
          <button type="submit" className="btn btn--primary">
            Add Task
          </button>
        </form>
      </section>

      <main className="board">
        <section
          className={`column ${dragTarget === STATUS.ACTIVE ? 'column--highlight' : ''}`}
          onDragOver={(event) => handleDragOver(event, STATUS.ACTIVE)}
          onDrop={(event) => handleDrop(event, STATUS.ACTIVE)}
          onDragLeave={() => handleDragLeave(STATUS.ACTIVE)}
        >
          <header>
            <h2>Active</h2>
            <span className="badge">{activeTasks.length}</span>
          </header>
          <p className="column__help">Drag tasks here to reopen them.</p>
          <ul>{activeTasks.map(renderTask)}</ul>
        </section>

        <section
          className={`column ${dragTarget === STATUS.COMPLETED ? 'column--highlight' : ''}`}
          onDragOver={(event) => handleDragOver(event, STATUS.COMPLETED)}
          onDrop={(event) => handleDrop(event, STATUS.COMPLETED)}
          onDragLeave={() => handleDragLeave(STATUS.COMPLETED)}
        >
          <header>
            <h2>Completed</h2>
            <span className="badge">{completedTasks.length}</span>
          </header>
          <p className="column__help">Drop tasks here to mark them done.</p>
          <ul>{completedTasks.map(renderTask)}</ul>
        </section>
      </main>
    </div>
  );
}

export default App;
