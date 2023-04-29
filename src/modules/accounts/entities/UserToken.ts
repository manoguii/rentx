import { v4 as uuidV4 } from 'uuid'

import { User } from '@prisma/client'

class UserToken {
  id: string
  refresh_token: string
  user_id: string
  user: User
  expires_date: Date
  created_at: Date

  constructor() {
    if (!this.id) {
      this.id = uuidV4()
    }
  }
}

export { UserToken }
