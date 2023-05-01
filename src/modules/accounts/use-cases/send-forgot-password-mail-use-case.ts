import 'dotenv'
import { resolve } from 'node:path'
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
      'views',
      'emails',
      'forgot-password-template.hbs',
    )

    if (!user) {
      throw new AppError('User does not exist !')
    }

    const token = randomUUID()

    const emailDurationTime = 3

    const expires_date = this.dateProvider.addHours(emailDurationTime)

    await this.usersTokensRepository.create({
      refresh_token: token,
      user_id: user.id,
      expires_date,
    })

    const variables = {
      name: user.name,
      link: `${process.env.FORGOT_EMAIL_URL}${token}`,
    }

    const recoveryLink = await this.mailProvider.sendEmail(
      email,
      'Recuperação de senha',
      variables,
      templatePath,
    )

    if (!recoveryLink) {
      throw new AppError(
        'Unable to generate password recovery link, please try again later!',
      )
    }

    return recoveryLink
  }
}

export { SendForgotPasswordMailUseCase }
