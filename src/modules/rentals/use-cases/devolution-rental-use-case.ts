import { inject, injectable } from 'tsyringe'

import { AppError } from '@errors/AppError'
import { Rental } from '@prisma/client'
import { IRentalsRepository } from '@modules/rentals/repositories/interface/IRentalsRepository'
import { ICarsRepository } from '@modules/cars/repositories/interface/ICarsRepository'
import { IDateProvider } from '@providers/date-provider/IDateProvider'

interface IRequest {
  rental_id: string
}

@injectable()
class DevolutionRentalUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,

    @inject('DayJsDateProvider')
    private dateProvider: IDateProvider,

    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
  ) {}

  async execute({ rental_id }: IRequest): Promise<Rental> {
    const rental = await this.rentalsRepository.findById(rental_id)

    const car = await this.carsRepository.findById(rental.car_id)

    if (!rental) {
      throw new AppError('Rental does not exists !')
    }

    // -> calcula valor total do aluguel incluindo a diária e multa de atraso(caso a data da devolução tiver passado da data determinada em expected_return_date), e atualiza o objeto rental.

    const minimum_daily = 1

    const dateNow = this.dateProvider.dateNow()

    let daily = this.dateProvider.compareInDays(rental.start_date, dateNow)

    if (daily <= 0) {
      daily = minimum_daily
    }

    const delay = this.dateProvider.compareInDays(
      dateNow,
      rental.expected_return_date,
    )

    let total = 0

    if (delay > 0) {
      const calculate_fine = delay * car.fine_amount
      total = calculate_fine
    }

    total += daily * car.daily_rate

    const updatedRent = await this.rentalsRepository.devolutionRental({
      rental_id,
      end_date: dateNow,
      total_rental: total,
    })

    await this.carsRepository.updateAvailable(car.id, true)

    return updatedRent
  }
}

export { DevolutionRentalUseCase }
