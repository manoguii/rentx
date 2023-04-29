import { v4 as uuidV4 } from 'uuid'

class CarImage {
  id: string
  car_id: string
  image_name: string
  created_at: string

  constructor() {
    if (!this.id) {
      this.id = uuidV4()
    }
  }
}

export { CarImage }
