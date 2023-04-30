import { randomUUID } from 'node:crypto'

class User {
  id: string
  name: string
  email: string
  password: string
  driver_license: string
  isAdmin: boolean
  avatar: string
  created_at: Date

  constructor() {
    this.id = randomUUID()
  }
}

export { User }
