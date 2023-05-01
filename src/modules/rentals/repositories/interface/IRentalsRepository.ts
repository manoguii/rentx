import { ICreateRentalDTO } from '../../dtos/ICreateRentalDTO'
import { Rental } from '@prisma/client'

export type DevolutionRentalType = {
  end_date: Date
  total_rental: number
  rental_id: string
}

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
  devolutionRental({
    end_date,
    rental_id,
    total_rental,
  }: DevolutionRentalType): Promise<Rental>
}

export { IRentalsRepository }
