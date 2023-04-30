import { ICreateRentalDTO } from '../../dtos/ICreateRentalDTO'
import { Rental } from '@prisma/client'

interface IRentalsRepository {
  create({
    car_id,
    user_id,
    expected_return_date,
  }: ICreateRentalDTO): Promise<Rental>
  findOpenRentalByCar(car_id: string): Promise<Rental>
  findOpenRentalByUser(user_id: string): Promise<Rental>
  findById(id: string): Promise<Rental>
  findByUser(user_id: string): Promise<Rental[]>
}

export { IRentalsRepository }
