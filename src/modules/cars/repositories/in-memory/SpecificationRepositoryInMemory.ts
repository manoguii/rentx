import { Specification } from '@prisma/client'
import { Specification as SpecificationEntity } from '@modules/cars/entities/Specification'
import { ISpecificationRepository } from '../interface/ISpecificationRepository'
import { ICreateSpecificationDTO } from '@modules/cars/dtos/ICreateSpecificationDTO'

class SpecificationRepositoryInMemory implements ISpecificationRepository {
  specifications: Specification[] = []

  async create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = new SpecificationEntity()

    Object.assign(specification, { name, description })

    this.specifications.push(specification)

    return specification
  }

  async findByName(name: string): Promise<Specification> {
    return this.specifications.find(
      (specification) => specification.name === name,
    )
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    const allSpecifications = this.specifications.filter((specification) =>
      ids.includes(specification.id),
    )

    return allSpecifications
  }
}

export { SpecificationRepositoryInMemory }
