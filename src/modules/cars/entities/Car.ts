import { randomUUID } from 'node:crypto'

import { Category, Specification } from '@prisma/client'

class Car {
  id: string
  name: string
  description: string
  daily_rate: number
  available: boolean
  license_plate: string
  fine_amount: number
  brand: string
  category: Category
  category_id: string
  specifications: Specification[]
  created_at: Date

  constructor() {
    this.id = randomUUID()
    this.available = true
  }
}

export { Car }
