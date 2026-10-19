import React, { useState, useRef } from 'react'
import './Column.css'
import { Task, ColumnId } from '../../types'
import { TaskCard } from '../TaskCard/TaskCard'
import { TaskForm } from '../TaskForm/TaskForm'

const COLUMN_ACCENT: Record<ColumnId, string> = {
  TODO: 'var(--color-todo)',
  IN_PROGRESS: 'var(--color-inprogress)',
  READY: 'var(--color-ready)',
}

interface ColumnProps {
  column: ColumnId
  label: string
  tasks: Task[]
  onAddTask: (title: string, tags: string[]) => void
  onEdit: (id: string, title: string, tags: string[]) => void
  onDelete: (id: string) => void
  onMove: (id: string) => void
  onDrop: (draggedId: string, targetId: string | null, targetColumn: ColumnId) => void
}

export function Column({ column, label, tasks, onAddTask, onEdit, onDelete, onMove, onDrop }: ColumnProps) {
  const [isAdding, setIsAdding] = useState(false)
  const [isDragOver, setIsDragOver] = useState(false)
  const dragCounter = useRef(0)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault()
    dragCounter.current++
    setIsDragOver(true)
  }

  const handleDragLeave = () => {
    dragCounter.current--
    if (dragCounter.current === 0) setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    dragCounter.current = 0
    setIsDragOver(false)
    const draggedId = e.dataTransfer.getData('taskId')
    if (draggedId) onDrop(draggedId, null, column)
  }

  return (
    <div className="column">
      <div className="column-header">
        <span className="column-accent" style={{ background: COLUMN_ACCENT[column] }} aria-hidden="true" />
        <span className="column-title">{label}</span>
        <span className="column-count" aria-label={`${tasks.length} tasks`}>{tasks.length}</span>
      </div>

      <div
        className={`column-drop-zone${isDragOver ? ' drag-over' : ''}`}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        role="list"
        aria-label={`${label} tasks`}
      >
        {tasks.map(task => (
          <TaskCard
            key={task.id}
            task={task}
            onMove={onMove}
            onEdit={onEdit}
            onDelete={onDelete}
            onDrop={onDrop}
          />
        ))}
      </div>

      {isAdding ? (
        <TaskForm
          onSave={(title, tags) => { onAddTask(title, tags); setIsAdding(false) }}
          onCancel={() => setIsAdding(false)}
        />
      ) : (
        <button
          className="column-add-btn"
          onClick={() => setIsAdding(true)}
          aria-label={`Add task to ${label}`}
        >
          + Add task
        </button>
      )}
    </div>
  )
}
