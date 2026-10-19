// @vitest-environment jsdom
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { TaskForm } from './TaskForm'

describe('TaskForm', () => {
  it('renders title and tag inputs', () => {
    render(<TaskForm onSave={vi.fn()} onCancel={vi.fn()} />)
    expect(screen.getByLabelText('Task title')).toBeDefined()
    expect(screen.getByLabelText('Tags, comma separated')).toBeDefined()
  })

  it('calls onSave with title and tags', async () => {
    const onSave = vi.fn()
    render(<TaskForm onSave={onSave} onCancel={vi.fn()} />)
    await userEvent.type(screen.getByLabelText('Task title'), 'My task')
    await userEvent.type(screen.getByLabelText('Tags, comma separated'), 'urgent, bug')
    await userEvent.click(screen.getByText('Add'))
    expect(onSave).toHaveBeenCalledWith('My task', ['urgent', 'bug'])
  })

  it('calls onCancel when Cancel is clicked', async () => {
    const onCancel = vi.fn()
    render(<TaskForm onSave={vi.fn()} onCancel={onCancel} />)
    await userEvent.click(screen.getByText('Cancel'))
    expect(onCancel).toHaveBeenCalled()
  })

  it('does not call onSave with empty title', async () => {
    const onSave = vi.fn()
    render(<TaskForm onSave={onSave} onCancel={vi.fn()} />)
    await userEvent.click(screen.getByText('Add'))
    expect(onSave).not.toHaveBeenCalled()
  })

  it('prefills initial values when editing', () => {
    render(<TaskForm initial={{ title: 'Existing', tags: ['bug'] }} onSave={vi.fn()} onCancel={vi.fn()} />)
    expect((screen.getByLabelText('Task title') as HTMLInputElement).value).toBe('Existing')
    expect(screen.getByText('Save')).toBeDefined()
  })
})
