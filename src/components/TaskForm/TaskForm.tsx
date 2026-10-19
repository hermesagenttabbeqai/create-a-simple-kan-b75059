import React, { useState, useRef, useEffect } from 'react'
import './TaskForm.css'

interface TaskFormProps {
  initial?: { title: string; tags: string[] }
  onSave: (title: string, tags: string[]) => void
  onCancel: () => void
}

export function TaskForm({ initial, onSave, onCancel }: TaskFormProps) {
  const [title, setTitle] = useState(initial?.title ?? '')
  const [tagInput, setTagInput] = useState(initial?.tags.join(', ') ?? '')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const parseTags = (raw: string) =>
    raw.split(',').map(s => s.trim()).filter(Boolean)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = title.trim()
    if (!trimmed) return
    onSave(trimmed, parseTags(tagInput))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') onCancel()
  }

  return (
    <form className="task-form" onSubmit={handleSubmit} onKeyDown={handleKeyDown} aria-label="Task form">
      <input
        ref={inputRef}
        className="task-form-input"
        type="text"
        placeholder="Task title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        aria-label="Task title"
        required
      />
      <input
        className="task-form-input"
        type="text"
        placeholder="Tags (comma-separated)"
        value={tagInput}
        onChange={e => setTagInput(e.target.value)}
        aria-label="Tags, comma separated"
      />
      <p className="task-form-hint">Separate tags with commas, e.g. urgent, bug</p>
      <div className="task-form-actions">
        <button type="submit" className="task-form-btn primary">
          {initial ? 'Save' : 'Add'}
        </button>
        <button type="button" className="task-form-btn secondary" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  )
}
