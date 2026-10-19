// @vitest-environment jsdom
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { TaskCard } from './TaskCard'
import { Task } from '../../types'

const task: Task = {
  id: '1', title: 'Do something', column: 'TODO', tags: ['urgent', 'bug'], order: 0,
}

const noop = vi.fn()

describe('TaskCard', () => {
  it('renders task title', () => {
    render(<TaskCard task={task} onMove={noop} onEdit={noop} onDelete={noop} onDrop={noop} />)
    expect(screen.getByText('Do something')).toBeDefined()
  })

  it('renders tags', () => {
    render(<TaskCard task={task} onMove={noop} onEdit={noop} onDelete={noop} onDrop={noop} />)
    expect(screen.getByText('urgent')).toBeDefined()
    expect(screen.getByText('bug')).toBeDefined()
  })

  it('shows Move, Edit, Delete buttons', () => {
    render(<TaskCard task={task} onMove={noop} onEdit={noop} onDelete={noop} onDrop={noop} />)
    expect(screen.getByLabelText('Move to next column')).toBeDefined()
    expect(screen.getByLabelText('Edit task')).toBeDefined()
    expect(screen.getByLabelText('Delete task')).toBeDefined()
  })

  it('calls onDelete when Delete is clicked', async () => {
    const onDelete = vi.fn()
    render(<TaskCard task={task} onMove={noop} onEdit={onDelete} onDelete={onDelete} onDrop={noop} />)
    await userEvent.click(screen.getByLabelText('Delete task'))
    expect(onDelete).toHaveBeenCalled()
  })

  it('calls onMove when → is clicked', async () => {
    const onMove = vi.fn()
    render(<TaskCard task={task} onMove={onMove} onEdit={noop} onDelete={noop} onDrop={noop} />)
    await userEvent.click(screen.getByLabelText('Move to next column'))
    expect(onMove).toHaveBeenCalledWith('1')
  })
})
