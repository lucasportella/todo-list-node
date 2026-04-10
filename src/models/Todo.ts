type Status = "pending" | "in progress" | "done"

export interface NewTodo {
  userId: string
  title: string
  description?: string
  status: Status
}

export interface Todo {
  id: number
  userId: string
  title: string
  description?: string
  status: Status
  createdAt: Date
  updatedAt: Date
}
