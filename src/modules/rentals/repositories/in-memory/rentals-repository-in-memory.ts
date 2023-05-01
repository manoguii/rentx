import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO'
import { Rental as RentalEntity } from '@modules/rentals/entities/Rental'
import { Rental } from '@prisma/client'
import {
  DevolutionRentalType,
  IRentalsRepository,
} from '../interface/IRentalsRepository'

class RentalsRepositoryInMemory implements IRentalsRepository {
  rentals: Rental[] = []

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    return this.rentals.find(
      (rental) => rental.car_id === car_id && !rental.end_date,
    )
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    return this.rentals.find(
      (rental) => rental.user_id === user_id && !rental.end_date,
    )
  }

  async create({
    car_id,
    user_id,
    expected_return_date,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = new RentalEntity()

    Object.assign(rental, {
      car_id,
      user_id,
      expected_return_date,
      start_date: new Date(),
    })

    this.rentals.push(rental)

    return rental
  }

  async findById(id: string): Promise<Rental> {
    return this.rentals.find((rental) => rental.id === id)
  }

  async findByUser(user_id: string): Promise<Rental[]> {
    return this.rentals.filter((rental) => rental.user_id === user_id)
  }

  async devolutionRental({
    end_date,
    rental_id,
    total_rental,
  }: DevolutionRentalType): Promise<Rental> {
    let updatedRent: Rental

    this.rentals.map((rental) => {
      if (rental.id === rental_id) {
        const newRent = {
          ...rental,
          end_date,
          total: total_rental,
        }

        updatedRent = newRent

        return newRent
      } else {
        return rental
      }
    })

    return updatedRent
  }
}

export { RentalsRepositoryInMemory }
