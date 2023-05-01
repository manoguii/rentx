import { randomUUID } from 'node:crypto'

class Specification {
  id: string
  name: string
  description: string
  created_at: Date
  car_id: string | null

  constructor() {
    this.id = randomUUID()
  }
}

export { Specification }
