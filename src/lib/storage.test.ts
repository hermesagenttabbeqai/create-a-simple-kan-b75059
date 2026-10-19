// @vitest-environment jsdom
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { loadBoard, saveBoard } from './storage'
import { Task } from '../types'

// Node 26 sets localStorage to undefined unless --localstorage-file is given.
// Provide a simple in-memory stub so the tests work in any Node version.
const store: Record<string, string> = {}
const localStorageMock = {
  getItem: (key: string) => store[key] ?? null,
  setItem: (key: string, value: string) => { store[key] = value },
  removeItem: (key: string) => { delete store[key] },
  clear: () => { Object.keys(store).forEach(k => delete store[k]) },
}
vi.stubGlobal('localStorage', localStorageMock)

const mockTasks: Task[] = [
  { id: '1', title: 'Test task', column: 'TODO', tags: ['test'], order: 0 },
]

describe('storage', () => {
  beforeEach(() => {
    localStorageMock.clear()
  })

  it('loadBoard returns empty array when nothing is stored', () => {
    expect(loadBoard()).toEqual([])
  })

  it('saveBoard persists tasks and loadBoard retrieves them', () => {
    saveBoard(mockTasks)
    expect(loadBoard()).toEqual(mockTasks)
  })

  it('loadBoard returns empty array on invalid JSON', () => {
    localStorageMock.setItem('kanban-board', 'not-json')
    expect(loadBoard()).toEqual([])
  })

  it('loadBoard returns empty array when value is not an array', () => {
    localStorageMock.setItem('kanban-board', JSON.stringify({ wrong: true }))
    expect(loadBoard()).toEqual([])
  })

  it('saveBoard overwrites previous data', () => {
    saveBoard(mockTasks)
    saveBoard([])
    expect(loadBoard()).toEqual([])
  })
})
