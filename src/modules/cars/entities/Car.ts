import { v4 as uuidV4 } from 'uuid'

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
    this.id = uuidV4()
    this.available = true
  }
}

export { Car }
