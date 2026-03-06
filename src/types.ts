export type Status = 'todo' | 'done'
export type Priority = 'low' | 'medium' | 'high'

export interface TodoItem {
  id: string
  text: string
  status: Status
  priority: Priority
  createdAt: number
  order: number
}
