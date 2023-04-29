import { ICreateUserTokenDTO } from '@modules/accounts/dtos/ICreateUserTokenDTO'
import { UserToken } from '@prisma/client'
import { prisma } from '@lib/prisma'
import { IUsersTokensRepository } from './interface/IUsersTokensRepository'

class UsersTokensRepository implements IUsersTokensRepository {
  async create({
    expires_date,
    refresh_token,
    user_id,
  }: ICreateUserTokenDTO): Promise<UserToken> {
    const userToken = await prisma.userToken.create({
      data: {
        expires_date,
        refresh_token,
        user_id,
      },
    })

    return userToken
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string,
  ): Promise<UserToken> {
    const usersTokens = await prisma.userToken.findUnique({
      where: {
        refresh_token,
        user_id,
      },
    })

    return usersTokens
  }

  async deleteById(id: string): Promise<void> {
    await prisma.userToken.delete({
      where: {
        id,
      },
    })
  }

  async findByRefreshToken(refresh_token: string): Promise<UserToken> {
    const userToken = await prisma.userToken.findUnique({
      where: {
        refresh_token,
      },
    })

    return userToken
  }
}

export { UsersTokensRepository }
