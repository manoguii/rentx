import { v4 as uuidv4 } from 'uuid'

class Specification {
  id: string
  name: string
  description: string
  created_at: Date
  car_id: string | null

  constructor() {
    if (!this.id) {
      this.id = uuidv4()
    }
  }
}

export { Specification }
