import { randomUUID } from 'node:crypto'

class CarImage {
  id: string
  car_id: string
  image_name: string
  created_at: string

  constructor() {
    this.id = randomUUID()
  }
}

export { CarImage }
