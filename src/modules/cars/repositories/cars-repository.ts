import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO'

import { Car } from '@prisma/client'
import { ICarsRepository } from './interface/ICarsRepository'
import { prisma } from '@lib/prisma'

class CarsRepository implements ICarsRepository {
  async create({
    brand,
    description,
    category_id,
    daily_rate,
    fine_amount,
    license_plate,
    name,
  }: ICreateCarDTO): Promise<Car> {
    const car = await prisma.car.create({
      data: {
        brand,
        description,
        category_id,
        daily_rate,
        fine_amount,
        license_plate,
        name,
      },
    })

    return car
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = await prisma.car.findUnique({
      where: {
        license_plate,
      },
    })

    return car
  }

  async findById(id: string): Promise<Car> {
    const car = await prisma.car.findUnique({
      where: {
        id,
      },
    })

    return car
  }

  async updateAvailable(id: string, available: boolean): Promise<void> {
    await prisma.car.update({
      data: {
        available,
      },
      where: {
        id,
      },
    })
  }

  async findAvailable(
    brand?: string,
    category_id?: string,
    name?: string,
  ): Promise<Car[]> {
    if (brand || category_id || name) {
      return await prisma.car.findMany({
        where: {
          available: {
            equals: true,
          },
          OR: [
            {
              brand: {
                equals: brand,
              },
            },
            {
              category_id: {
                equals: category_id,
              },
            },
            {
              name: {
                equals: name,
              },
            },
          ],
        },
      })
    }

    const cars = await prisma.car.findMany({
      where: {
        available: {
          equals: true,
        },
      },
    })

    return cars
  }
}

export { CarsRepository }
