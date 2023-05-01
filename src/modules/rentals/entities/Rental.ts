import { randomUUID } from 'node:crypto'

import { Car } from '@prisma/client'

class Rental {
  id: string
  car: Car
  car_id: string
  user_id: string
  start_date: Date
  end_date: Date
  expected_return_date: Date
  total: number
  created_at: Date
  updated_at: Date

  constructor() {
    this.id = randomUUID()
  }
}

export { Rental }
