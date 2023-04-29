import { ICreateSpecificationDTO } from '@modules/cars/dtos/ICreateSpecificationDTO'
import { Specification } from '@prisma/client'

interface ISpecificationRepository {
  create({ name, description }: ICreateSpecificationDTO): Promise<Specification>
  findByName(name: string): Promise<Specification>
  addSpecificationToCar(
    car_id: string,
    specification_id: string,
  ): Promise<Specification>
}

export { ISpecificationRepository }
