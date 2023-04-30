import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { ListRentalsByUserUseCase } from '../use-cases/list-rentals-by-user-use-case'

class ListRentalsByUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user

    const listRentalByUserUseCase = container.resolve(ListRentalsByUserUseCase)

    const rentals = await listRentalByUserUseCase.execute(user_id)

    return response.json(rentals)
  }
}

export { ListRentalsByUserController }
