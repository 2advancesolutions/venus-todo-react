export type Status = 'todo' | 'done'

export interface TodoItem {
  id: string
  text: string
  status: Status
  createdAt: number
  priority: 'low' | 'medium' | 'high'
}
