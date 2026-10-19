import { Task, ColumnId } from '../types'

const COLUMN_ORDER: ColumnId[] = ['TODO', 'IN_PROGRESS', 'READY']

function generateId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  return Math.random().toString(36).slice(2) + Date.now().toString(36)
}

export function createTask(title: string, column: ColumnId, existingTasks: Task[]): Task {
  const tasksInColumn = existingTasks.filter(t => t.column === column)
  const maxOrder = tasksInColumn.length > 0
    ? Math.max(...tasksInColumn.map(t => t.order))
    : -1
  return {
    id: generateId(),
    title: title.trim(),
    column,
    tags: [],
    order: maxOrder + 1,
  }
}

export function nextColumn(column: ColumnId): ColumnId {
  const idx = COLUMN_ORDER.indexOf(column)
  return COLUMN_ORDER[(idx + 1) % COLUMN_ORDER.length]
}

export function moveTask(tasks: Task[], taskId: string, targetColumn: ColumnId): Task[] {
  const tasksInTarget = tasks.filter(t => t.column === targetColumn)
  const maxOrder = tasksInTarget.length > 0
    ? Math.max(...tasksInTarget.map(t => t.order))
    : -1
  return tasks.map(t =>
    t.id === taskId ? { ...t, column: targetColumn, order: maxOrder + 1 } : t
  )
}

export function reorderTasks(
  tasks: Task[],
  draggedId: string,
  targetId: string | null,
  targetColumn: ColumnId
): Task[] {
  const dragged = tasks.find(t => t.id === draggedId)
  if (!dragged) return tasks

  // Remove dragged from list
  let updated = tasks.filter(t => t.id !== draggedId)

  // Get tasks in target column (after removal), sorted by order
  const colTasks = updated
    .filter(t => t.column === targetColumn)
    .sort((a, b) => a.order - b.order)

  let insertIdx = colTasks.length
  if (targetId) {
    const targetIdx = colTasks.findIndex(t => t.id === targetId)
    if (targetIdx !== -1) insertIdx = targetIdx
  }

  // Reassign orders
  colTasks.splice(insertIdx, 0, { ...dragged, column: targetColumn })
  const reordered = colTasks.map((t, i) => ({ ...t, order: i }))

  // Merge back
  updated = updated.filter(t => t.column !== targetColumn)
  return [...updated, ...reordered]
}
