import { describe, it, expect } from 'vitest'
import { createTask, nextColumn, moveTask, reorderTasks } from './taskUtils'
import { Task } from '../types'

const baseTasks: Task[] = [
  { id: 'a', title: 'Task A', column: 'TODO', tags: [], order: 0 },
  { id: 'b', title: 'Task B', column: 'TODO', tags: [], order: 1 },
  { id: 'c', title: 'Task C', column: 'IN_PROGRESS', tags: [], order: 0 },
]

describe('createTask', () => {
  it('creates a task with correct defaults', () => {
    const t = createTask('My task', 'TODO', [])
    expect(t.title).toBe('My task')
    expect(t.column).toBe('TODO')
    expect(t.tags).toEqual([])
    expect(typeof t.id).toBe('string')
  })

  it('assigns order after last task in column', () => {
    const t = createTask('New', 'TODO', baseTasks)
    expect(t.order).toBe(2)
  })

  it('trims the title', () => {
    const t = createTask('  trimmed  ', 'READY', [])
    expect(t.title).toBe('trimmed')
  })
})

describe('nextColumn', () => {
  it('cycles TODO -> IN_PROGRESS -> READY -> TODO', () => {
    expect(nextColumn('TODO')).toBe('IN_PROGRESS')
    expect(nextColumn('IN_PROGRESS')).toBe('READY')
    expect(nextColumn('READY')).toBe('TODO')
  })
})

describe('moveTask', () => {
  it('moves a task to a new column', () => {
    const updated = moveTask(baseTasks, 'a', 'READY')
    const moved = updated.find(t => t.id === 'a')!
    expect(moved.column).toBe('READY')
  })
})

describe('reorderTasks', () => {
  it('moves dragged task to target column at target position', () => {
    const result = reorderTasks(baseTasks, 'a', 'c', 'IN_PROGRESS')
    const moved = result.find(t => t.id === 'a')!
    expect(moved.column).toBe('IN_PROGRESS')
  })

  it('returns unchanged list when dragged id not found', () => {
    const result = reorderTasks(baseTasks, 'nonexistent', null, 'READY')
    expect(result).toEqual(baseTasks)
  })
})
