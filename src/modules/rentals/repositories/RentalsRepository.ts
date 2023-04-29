import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO'

import { Rental } from '@prisma/client'
import { IRentalsRepository } from './interface/IRentalsRepository'
import { prisma } from '@lib/prisma'

class RentalsRepository implements IRentalsRepository {
  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    const openByCar = await this.repository.findOne({
      where: { car_id, end_date: null },
    })

    return openByCar
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    const openByUser = await this.repository.findOne({
      where: { user_id, end_date: null },
    })

    return openByUser
  }

  async create({
    car_id,
    user_id,
    expected_return_date,
    end_date,
    id,
    total,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = await prisma.rental.create({
      data: {
        car_id,
        user_id,
        expected_return_date,
        end_date,
        id,
        total,
        start_date: new Date(),
      },
    })

    return rental
  }

  async findById(id: string): Promise<Rental> {
    const rental = await prisma.rental.findUnique({
      where: {
        id,
      },
    })

    return rental
  }

  async findByUser(user_id: string): Promise<Rental[]> {
    const rentals = await prisma.rental.findMany({
      where: {
        user_id,
      },
    })

    return rentals
  }
}

export { RentalsRepository }
