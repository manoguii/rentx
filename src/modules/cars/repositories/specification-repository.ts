import { Specification } from '@prisma/client'
import { prisma } from '@lib/prisma'
import { ISpecificationRepository } from './interface/ISpecificationRepository'
import { ICreateSpecificationDTO } from '../dtos/ICreateSpecificationDTO'

class SpecificationRepository implements ISpecificationRepository {
  async create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = await prisma.specification.create({
      data: {
        name,
        description,
      },
    })

    return specification
  }

  async findByName(name: string): Promise<Specification> {
    const specification = await prisma.specification.findUnique({
      where: {
        name,
      },
    })

    return specification
  }

  async addSpecificationToCar(
    car_id: string,
    specification_id: string,
  ): Promise<Specification> {
    const specification = await prisma.specification.update({
      where: {
        id: specification_id,
      },
      data: {
        car_id,
      },
      include: {
        car: true,
      },
    })

    return specification
  }
}

export { SpecificationRepository }
