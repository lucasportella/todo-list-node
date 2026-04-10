type Status = "pending" | "in progress" | "done"

export interface NewTodo {
  userId: number
  title: string
  description?: string
  status: Status
}

export interface UpdateTodo {
  id: number
  userId: number
  title: string
  description?: string
  status: Status
}

export interface Todo {
  id: number
  userId: number
  title: string
  description?: string
  status: Status
  createdAt: Date
  updatedAt: Date
}
