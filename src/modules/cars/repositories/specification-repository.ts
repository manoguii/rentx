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

  async findByIds(ids: string[]): Promise<Specification[]> {
    // const specifications = await prisma.specification.findMany()

    return specifications
  }
}

export { SpecificationRepository }
