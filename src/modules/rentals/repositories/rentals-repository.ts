import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO'
import { Rental } from '@prisma/client'
import {
  DevolutionRentalType,
  IRentalsRepository,
} from './interface/IRentalsRepository'
import { prisma } from '@lib/prisma'

class RentalsRepository implements IRentalsRepository {
  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    const openByCar = await prisma.rental.findMany({
      where: {
        AND: [
          {
            car_id,
          },
          {
            end_date: {
              equals: null,
            },
          },
        ],
      },
    })

    return openByCar[0]
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    const openByUser = await prisma.rental.findMany({
      where: {
        AND: [
          {
            user_id,
          },
          {
            end_date: {
              equals: null,
            },
          },
        ],
      },
    })

    return openByUser[0]
  }

  async create({
    car_id,
    user_id,
    expected_return_date,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = await prisma.rental.create({
      data: {
        car_id,
        user_id,
        expected_return_date,
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

  async devolutionRental({
    end_date,
    rental_id,
    total_rental,
  }: DevolutionRentalType): Promise<Rental> {
    const rental = await prisma.rental.update({
      where: {
        id: rental_id,
      },
      data: {
        end_date,
        total: total_rental,
      },
    })

    return rental
  }
}

export { RentalsRepository }
