import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { SendForgotPasswordMailUseCase } from '../use-cases/send-forgot-password-mail-use-case'

class SendForgotPasswordMailController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email } = request.body

    const sendForgotPasswordMailUseCase = container.resolve(
      SendForgotPasswordMailUseCase,
    )

    const recovery_link = await sendForgotPasswordMailUseCase.execute(email)

    return response.status(200).json({ recovery_link })
  }
}

export { SendForgotPasswordMailController }
