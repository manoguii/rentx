import { v4 as uuidV4 } from 'uuid'

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
    this.id = uuidV4()
  }
}

export { User }
