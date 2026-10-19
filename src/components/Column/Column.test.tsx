// @vitest-environment jsdom
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

import { Column } from './Column'
import { Task } from '../../types'

const noop = vi.fn()

const tasks: Task[] = [
  { id: '1', title: 'Task one', column: 'TODO', tags: ['bug'], order: 0 },
]

describe('Column', () => {
  it('renders the column label', () => {
    render(
      <Column column="TODO" label="TODO" tasks={[]} onAddTask={noop}
        onEdit={noop} onDelete={noop} onMove={noop} onDrop={noop} />
    )
    expect(screen.getByText('TODO')).toBeDefined()
  })

  it('renders tasks', () => {
    render(
      <Column column="TODO" label="TODO" tasks={tasks} onAddTask={noop}
        onEdit={noop} onDelete={noop} onMove={noop} onDrop={noop} />
    )
    expect(screen.getByText('Task one')).toBeDefined()
  })

  it('shows task count', () => {
    render(
      <Column column="TODO" label="TODO" tasks={tasks} onAddTask={noop}
        onEdit={noop} onDelete={noop} onMove={noop} onDrop={noop} />
    )
    expect(screen.getByLabelText('1 tasks')).toBeDefined()
  })

  it('renders Add task button', () => {
    render(
      <Column column="TODO" label="TODO" tasks={[]} onAddTask={noop}
        onEdit={noop} onDelete={noop} onMove={noop} onDrop={noop} />
    )
    expect(screen.getByText('+ Add task')).toBeDefined()
  })
})
