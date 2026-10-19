export type ColumnId = 'TODO' | 'IN_PROGRESS' | 'READY'

export interface Task {
  id: string
  title: string
  column: ColumnId
  tags: string[]
  order: number
}
