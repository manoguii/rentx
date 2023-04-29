import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'

import auth from '@config/auth'
import { AppError } from '@errors/AppError'
import { IUsersRepository } from '@modules/accounts/repositories/interface/IUsersRepository'
import { IDateProvider } from '@providers/date-provider/IDateProvider'
import { IUsersTokensRepository } from '@modules/accounts/repositories/interface/IUsersTokensRepository'

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  user: {
    name: string
    email: string
  }
  refresh_token: string
  token: string
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('DayJsDateProvider')
    private dateProvider: IDateProvider,

    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    // Usuario existe

    const user = await this.usersRepository.findByEmail(email)

    const {
      secret_token,
      expires_in_token,
      secret_refresh_token,
      expires_in_refresh_token,
      expires_refresh_token_days,
    } = auth

    if (!user) {
      throw new AppError('Email or password incorrect')
    }

    // Senha está correta
    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      throw new AppError('Email or password incorrect')
    }

    // Gerar JWT
    const token = sign({}, secret_token, {
      subject: user.id,
      expiresIn: expires_in_token,
    })

    const refresh_token = sign({ email }, secret_refresh_token, {
      subject: user.id,
      expiresIn: expires_in_refresh_token,
    })

    const refresh_token_expires_date = this.dateProvider.addDays(
      expires_refresh_token_days,
    )

    console.log({ refresh_token_expires_date }, '💥')

    await this.usersTokensRepository.create({
      user_id: user.id,
      refresh_token,
      expires_date: refresh_token_expires_date,
    })

    const tokenResponse: IResponse = {
      token,
      refresh_token,
      user: {
        name: user.name,
        email: user.email,
      },
    }

    return tokenResponse
  }
}

export { AuthenticateUserUseCase }
