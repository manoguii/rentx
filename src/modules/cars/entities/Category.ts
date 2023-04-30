import { randomUUID } from 'node:crypto'

class Category {
  id: string
  name: string
  description: string
  created_at: Date

  constructor() {
    this.id = randomUUID()
  }
}

export { Category }
