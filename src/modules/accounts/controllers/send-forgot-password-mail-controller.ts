import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { SendForgotPasswordMailUseCase } from '../use-cases/send-forgot-password-mail-use-case'

class SendForgotPasswordMailController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email } = request.body

    const sendForgotPasswordMailUseCase = container.resolve(
      SendForgotPasswordMailUseCase,
    )

    await sendForgotPasswordMailUseCase.execute(email)

    return response.send()
  }
}

export { SendForgotPasswordMailController }
