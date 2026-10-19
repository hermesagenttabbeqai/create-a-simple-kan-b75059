import { useState, useCallback } from 'react'
import './Board.css'
import { Task, ColumnId } from '../../types'
import { loadBoard, saveBoard } from '../../lib/storage'
import { createTask, moveTask, reorderTasks, nextColumn } from '../../lib/taskUtils'
import { Column } from '../Column/Column'

const COLUMNS: { id: ColumnId; label: string }[] = [
  { id: 'TODO', label: 'TODO' },
  { id: 'IN_PROGRESS', label: 'IN PROGRESS' },
  { id: 'READY', label: 'READY' },
]

export function Board() {
  const [tasks, setTasks] = useState<Task[]>(() => loadBoard())

  const persist = useCallback((updated: Task[]) => {
    setTasks(updated)
    saveBoard(updated)
  }, [])

  const handleAddTask = useCallback((title: string, tags: string[], column: ColumnId) => {
    const task = createTask(title, column, tasks)
    const updated = [...tasks, { ...task, tags }]
    persist(updated)
  }, [tasks, persist])

  const handleEdit = useCallback((id: string, title: string, tags: string[]) => {
    persist(tasks.map(t => t.id === id ? { ...t, title, tags } : t))
  }, [tasks, persist])

  const handleDelete = useCallback((id: string) => {
    persist(tasks.filter(t => t.id !== id))
  }, [tasks, persist])

  const handleMove = useCallback((id: string) => {
    const task = tasks.find(t => t.id === id)
    if (!task) return
    persist(moveTask(tasks, id, nextColumn(task.column)))
  }, [tasks, persist])

  const handleDrop = useCallback((draggedId: string, targetId: string | null, targetColumn: ColumnId) => {
    persist(reorderTasks(tasks, draggedId, targetId, targetColumn))
  }, [tasks, persist])

  return (
    <main>
      <h1 style={{ textAlign: 'center', padding: 'var(--space-lg) 0', color: 'var(--color-accent)' }}>
        Kanban Board
      </h1>
      <div className="board">
        {COLUMNS.map(col => (
          <Column
            key={col.id}
            column={col.id}
            label={col.label}
            tasks={tasks.filter(t => t.column === col.id).sort((a, b) => a.order - b.order)}
            onAddTask={(title, tags) => handleAddTask(title, tags, col.id)}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onMove={handleMove}
            onDrop={handleDrop}
          />
        ))}
      </div>
    </main>
  )
}
