import { hash } from 'bcrypt'
import { inject, injectable } from 'tsyringe'

import { AppError } from '@errors/AppError'
import { IUsersRepository } from '@modules/accounts/repositories/interface/IUsersRepository'
import { IUsersTokensRepository } from '@modules/accounts/repositories/interface/IUsersTokensRepository'
import { IDateProvider } from '@providers/date-provider/IDateProvider'

interface IRequest {
  password: string
  token: string
}

@injectable()
class ResetPasswordUserUseCase {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,

    @inject('DayJsDateProvider')
    private dateProvider: IDateProvider,

    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
  ) {}

  async execute({ password, token }: IRequest): Promise<void> {
    const userToken = await this.usersTokensRepository.findByRefreshToken(token)

    if (!userToken) {
      throw new AppError('Token invalid !')
    }

    const isTokenExpired = this.dateProvider.compareIfBefore(
      userToken.expires_date,
      this.dateProvider.dateNow(),
    )

    if (isTokenExpired) {
      throw new AppError('Token expired !')
    }

    const user = await this.userRepository.findById(userToken.user_id)

    const newPassword = await hash(password, 8)

    await this.userRepository.updatePassword(user.id, newPassword)

    await this.usersTokensRepository.deleteById(userToken.id)
  }
}

export { ResetPasswordUserUseCase }
