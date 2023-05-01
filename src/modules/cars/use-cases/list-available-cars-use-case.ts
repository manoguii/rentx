import 'reflect-metadata'
import { inject, injectable } from 'tsyringe'

import { Car } from '@prisma/client'
import { ICarsRepository } from '@modules/cars/repositories/interface/ICarsRepository'

interface IRequest {
  category_id?: string
  brand?: string
  name?: string
}

@injectable()
class ListAvailableCarsUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
  ) {}

  async execute({ category_id, brand, name }: IRequest): Promise<Car[]> {
    const cars = await this.carsRepository.findAvailable(
      brand,
      category_id,
      name,
    )

    return cars
  }
}

export { ListAvailableCarsUseCase }
