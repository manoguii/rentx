import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DevolutionRentalUseCase } from '../use-cases/devolution-rental-use-case'

class DevolutionRentalController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { rental_id } = request.params

    const devolutionRentalUseCase = container.resolve(DevolutionRentalUseCase)

    const rental = await devolutionRentalUseCase.execute({
      rental_id,
    })

    return response.status(200).json(rental)
  }
}

export { DevolutionRentalController }
