import dayjs from 'dayjs'
import { resolve } from 'path'
import { inject, injectable } from 'tsyringe'
import { randomUUID } from 'node:crypto'

import { AppError } from '@errors/AppError'
import { IUsersRepository } from '@modules/accounts/repositories/interface/IUsersRepository'
import { IDateProvider } from '@providers/date-provider/IDateProvider'
import { IMailProvider } from '@providers/mail-provider/IMailProvider'
import { IUsersTokensRepository } from '@modules/accounts/repositories/interface/IUsersTokensRepository'

@injectable()
class SendForgotPasswordMailUseCase {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,

    @inject('DayJsDateProvider')
    private dateProvider: IDateProvider,

    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,

    @inject('EtherealMailProvider')
    private mailProvider: IMailProvider,
  ) {}

  async execute(email: string) {
    const user = await this.userRepository.findByEmail(email)

    const templatePath = resolve(
      __dirname,
      '..',
      '..',
      'views',
      'emails',
      'ForgotPassword.hbs',
    )

    if (!user) {
      throw new AppError('User does not exist !')
    }

    const token = randomUUID()

    const expires_date = dayjs().add(3, 'hours').toDate()

    await this.usersTokensRepository.create({
      refresh_token: token,
      user_id: user.id,
      expires_date,
    })

    const variables = {
      name: user.name,
      link: `${process.env.FORGOT_EMAIL_URL}${token}`,
    }

    await this.mailProvider.sendEmail(
      email,
      'Recuperarção de senha',
      variables,
      templatePath,
    )
  }
}

export { SendForgotPasswordMailUseCase }
