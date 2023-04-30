import { v4 as uuidV4 } from 'uuid'

class Specification {
  id: string
  name: string
  description: string
  created_at: Date
  car_id: string | null

  constructor() {
    this.id = uuidV4()
  }
}

export { Specification }
