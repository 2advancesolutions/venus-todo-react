import React, { useState } from 'react'

function DropZone({ onDrop, onDragOver, completedCount }) {
  const [isDragOver, setIsDragOver] = useState(false)

  const handleDragEnter = (e) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragOver(false)
    onDrop(e)
  }

  return (
    <div 
      className={`drop-zone ${isDragOver ? 'drag-over' : ''}`}
      onDrop={handleDrop}
      onDragOver={onDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
    >
      <p>🎯 Drop tasks here to complete them!</p>
      {completedCount > 0 && (
        <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
          {completedCount} task{completedCount !== 1 ? 's' : ''} completed
        </p>
      )}
    </div>
  )
}

export default DropZone