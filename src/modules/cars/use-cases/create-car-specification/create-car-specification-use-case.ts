import 'reflect-metadata'
import { inject, injectable } from 'tsyringe'

import { AppError } from '@errors/AppError'
import { Car, Specification } from '@prisma/client'
import { ICarsRepository } from '@modules/cars/repositories/interface/ICarsRepository'
import { ISpecificationRepository } from '@modules/cars/repositories/interface/ISpecificationRepository'

interface IRequest {
  car_id: string
  specifications_id: string[]
}

@injectable()
class CreateCarSpecificationUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,

    @inject('SpecificationRepository')
    private specificationsRepository: ISpecificationRepository,
  ) {}

  async execute({ car_id, specifications_id }: IRequest): Promise<
    Car & {
      Specification: Specification[]
    }
  > {
    const carExists = await this.carsRepository.findById(car_id)

    if (!carExists) {
      throw new AppError('Car does not exist !')
    }

    const specifications: Specification[] = []

    specifications_id.forEach(async (id) => {
      const specification =
        await this.specificationsRepository.addSpecificationToCar(
          carExists.id,
          id,
        )

      specifications.push(specification)
    })

    const carUpdated = await this.carsRepository.updateSpecifications(
      carExists.id,
      specifications,
    )

    return carUpdated
  }
}

export { CreateCarSpecificationUseCase }
