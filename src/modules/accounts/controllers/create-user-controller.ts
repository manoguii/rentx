import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { UserUseCase } from '../use-cases/create-user-use-case'

class UserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password, driver_license } = request.body

    const createUserUseCase = container.resolve(UserUseCase)

    await createUserUseCase.execute({
      name,
      email,
      password,
      driver_license,
    })

    return response.status(201).send()
  }
}

export { UserController }
