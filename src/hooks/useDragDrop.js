import { useState, useCallback, useRef } from 'react';

export function useDragDrop(onComplete) {
  const [draggingId, setDraggingId] = useState(null);
  const [dropActive, setDropActive] = useState(false);
  const dragEnterCount = useRef(0); // counter to handle bubbling

  const handleDragStart = useCallback((e, id) => {
    setDraggingId(id);
    e.dataTransfer.effectAllowed = 'move';
    // Store id in transfer — fallback for cross-browser
    e.dataTransfer.setData('text/plain', id);
  }, []);

  const handleDragEnd = useCallback(() => {
    setDraggingId(null);
    setDropActive(false);
    dragEnterCount.current = 0;
  }, []);

  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    dragEnterCount.current += 1;
    setDropActive(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    dragEnterCount.current -= 1;
    if (dragEnterCount.current <= 0) {
      dragEnterCount.current = 0;
      setDropActive(false);
    }
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    const id = draggingId || e.dataTransfer.getData('text/plain');
    if (id) {
      onComplete(id);
    }
    setDraggingId(null);
    setDropActive(false);
    dragEnterCount.current = 0;
  }, [draggingId, onComplete]);

  return {
    draggingId,
    isDragging: draggingId !== null,
    dropActive,
    handleDragStart,
    handleDragEnd,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
  };
}
