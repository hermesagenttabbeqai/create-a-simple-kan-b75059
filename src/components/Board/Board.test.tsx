// @vitest-environment jsdom
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import React from 'react'
import { Board } from './Board'

// Mock storage so Board starts with no tasks
vi.mock('../../lib/storage', () => ({
  loadBoard: () => [],
  saveBoard: vi.fn(),
}))

describe('Board', () => {
  it('renders three columns', () => {
    render(<Board />)
    expect(screen.getByText('TODO')).toBeDefined()
    expect(screen.getByText('IN PROGRESS')).toBeDefined()
    expect(screen.getByText('READY')).toBeDefined()
  })

  it('renders add task buttons for each column', () => {
    render(<Board />)
    const buttons = screen.getAllByText('+ Add task')
    expect(buttons.length).toBe(3)
  })

  it('renders the board heading', () => {
    render(<Board />)
    expect(screen.getByText('Kanban Board')).toBeDefined()
  })
})
