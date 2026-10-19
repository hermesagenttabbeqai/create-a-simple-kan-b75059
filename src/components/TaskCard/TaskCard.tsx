import React, { useState } from 'react'
import './TaskCard.css'
import { Task, ColumnId } from '../../types'
import { TaskForm } from '../TaskForm/TaskForm'

const TAG_COLORS = [
  'var(--tag-0)', 'var(--tag-1)', 'var(--tag-2)', 'var(--tag-3)', 'var(--tag-4)',
]

interface TaskCardProps {
  task: Task
  onMove: (id: string) => void
  onEdit: (id: string, title: string, tags: string[]) => void
  onDelete: (id: string) => void
  onDrop: (draggedId: string, targetId: string | null, targetColumn: ColumnId) => void
}

export function TaskCard({ task, onMove, onEdit, onDelete, onDrop }: TaskCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [isDragging, setIsDragging] = useState(false)

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('taskId', task.id)
    setIsDragging(true)
  }

  const handleDragEnd = () => setIsDragging(false)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const draggedId = e.dataTransfer.getData('taskId')
    if (draggedId && draggedId !== task.id) {
      onDrop(draggedId, task.id, task.column)
    }
  }

  if (isEditing) {
    return (
      <TaskForm
        initial={{ title: task.title, tags: task.tags }}
        onSave={(title, tags) => { onEdit(task.id, title, tags); setIsEditing(false) }}
        onCancel={() => setIsEditing(false)}
      />
    )
  }

  return (
    <div
      className={`task-card${isDragging ? ' dragging' : ''}`}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      role="listitem"
      aria-label={task.title}
    >
      <span className="task-card-title">{task.title}</span>
      {task.tags.length > 0 && (
        <div className="task-card-tags" aria-label="Tags">
          {task.tags.map((tag, i) => (
            <span
              key={tag}
              className="task-card-tag"
              style={{ background: TAG_COLORS[i % TAG_COLORS.length] }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      <div className="task-card-actions">
        <button
          className="task-card-btn"
          onClick={() => onMove(task.id)}
          aria-label="Move to next column"
        >
          →
        </button>
        <button
          className="task-card-btn"
          onClick={() => setIsEditing(true)}
          aria-label="Edit task"
        >
          Edit
        </button>
        <button
          className="task-card-btn danger"
          onClick={() => onDelete(task.id)}
          aria-label="Delete task"
        >
          Delete
        </button>
      </div>
    </div>
  )
}
