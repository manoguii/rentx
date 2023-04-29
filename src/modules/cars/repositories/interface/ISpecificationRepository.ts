import { ICreateSpecificationDTO } from '@modules/cars/dtos/ICreateSpecificationDTO'
import { Specification } from '@prisma/client'

interface ISpecificationRepository {
  create({ name, description }: ICreateSpecificationDTO): Promise<Specification>
  findByName(name: string): Promise<Specification>
  findByIds(ids: string[]): Promise<Specification[]>
}

export { ISpecificationRepository }
