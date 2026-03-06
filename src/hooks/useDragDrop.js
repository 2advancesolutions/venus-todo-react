import { useState, useRef, useCallback } from 'react';

export function useDragDrop({ onDrop }) {
  const [draggingId, setDraggingId] = useState(null);
  const [dropTargetActive, setDropTargetActive] = useState(false);
  const dragCounter = useRef(0);

  const handleDragStart = useCallback((e, id) => {
    setDraggingId(id);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', id);
    // slight delay so the ghost image renders before opacity change
    requestAnimationFrame(() => {
      e.target.style.opacity = '0.4';
    });
  }, []);

  const handleDragEnd = useCallback((e) => {
    e.target.style.opacity = '1';
    setDraggingId(null);
    setDropTargetActive(false);
    dragCounter.current = 0;
  }, []);

  const handleDropZoneDragEnter = useCallback((e) => {
    e.preventDefault();
    dragCounter.current += 1;
    setDropTargetActive(true);
  }, []);

  const handleDropZoneDragLeave = useCallback(() => {
    dragCounter.current -= 1;
    if (dragCounter.current === 0) setDropTargetActive(false);
  }, []);

  const handleDropZoneDragOver = useCallback((e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }, []);

  const handleDropZoneDrop = useCallback((e) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    dragCounter.current = 0;
    setDropTargetActive(false);
    setDraggingId(null);
    if (id) onDrop(id);
  }, [onDrop]);

  return {
    draggingId,
    dropTargetActive,
    handleDragStart,
    handleDragEnd,
    handleDropZoneDragEnter,
    handleDropZoneDragLeave,
    handleDropZoneDragOver,
    handleDropZoneDrop,
  };
}
