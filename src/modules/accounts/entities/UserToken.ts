import { randomUUID } from 'node:crypto'

import { User } from '@prisma/client'

class UserToken {
  id: string
  refresh_token: string
  user_id: string
  user: User
  expires_date: Date
  created_at: Date

  constructor() {
    this.id = randomUUID()
  }
}

export { UserToken }
