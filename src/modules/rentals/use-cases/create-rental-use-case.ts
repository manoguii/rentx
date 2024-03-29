import { inject, injectable } from 'tsyringe'

import { AppError } from '@errors/AppError'
import { Rental } from '@prisma/client'
import { IRentalsRepository } from '@modules/rentals/repositories/interface/IRentalsRepository'
import { ICarsRepository } from '@modules/cars/repositories/interface/ICarsRepository'
import { IDateProvider } from '@providers/date-provider/IDateProvider'

interface IRequest {
  user_id: string
  car_id: string
  expected_return_date: Date
}

@injectable()
class CreateRentalUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,

    @inject('DayJsDateProvider')
    private dateProvider: IDateProvider,

    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
  ) {}

  async execute({
    car_id,
    user_id,
    expected_return_date,
  }: IRequest): Promise<Rental> {
    const minimumTimeToRent = 24

    // Não deve ser possível cadastrar um novo aluguel caso já *** exista um aberto para o mesmo carro
    const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(
      car_id,
    )

    if (carUnavailable) {
      throw new AppError('Car is unavailable !')
    }

    // Não deve ser possível cadastrar um novo aluguel caso já *** exista um aberto para o mesmo usuário
    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(
      user_id,
    )

    if (rentalOpenToUser) {
      throw new AppError("There's a rental in progress for user !")
    }

    // O aluguel deve ter duração mínima de 24 horas.
    const dateNow = this.dateProvider.dateNow()

    const compare = this.dateProvider.compareInHours(
      dateNow,
      expected_return_date,
    )

    if (compare < minimumTimeToRent) {
      throw new AppError('Return date must be at least 24 hours')
    }

    const rental = await this.rentalsRepository.create({
      car_id,
      user_id,
      expected_return_date,
    })

    await this.carsRepository.updateAvailable(car_id, false)

    return rental
  }
}

export { CreateRentalUseCase }
