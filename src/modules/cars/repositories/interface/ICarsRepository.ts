import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO'
import { Car, Specification } from '@prisma/client'

interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>
  findByLicensePlate(license_plate: string): Promise<Car>
  findAvailable(
    brand?: string,
    category_id?: string,
    name?: string,
  ): Promise<Car[]>
  findById(id: string): Promise<Car>
  updateAvailable(id: string, available: boolean): Promise<void>
  createSpecifications(
    car_id: string,
    specifications: Specification[],
  ): Promise<
    Car & {
      Specification: Specification[]
    }
  >
}

export { ICarsRepository }
