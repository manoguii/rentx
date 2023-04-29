import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO'
import { Car } from '@modules/cars/entities/Car'
import { ICarsRepository } from '../interface/ICarsRepository'

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = []

  async create({
    brand,
    category_id,
    description,
    daily_rate,
    fine_amount,
    license_plate,
    name,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car()

    Object.assign(car, {
      brand,
      category_id,
      description,
      daily_rate,
      fine_amount,
      license_plate,
      name,
    })

    this.cars.push(car)

    return car
  }

  async findById(id: string): Promise<Car> {
    return this.cars.find((car) => car.id === id)
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find((car) => car.license_plate === license_plate)
  }

  async findAvailable(
    brand?: string,
    category_id?: string,
    name?: string,
  ): Promise<Car[]> {
    const cars: Car[] = []

    if (brand || category_id || name) {
      this.cars.forEach((car) => {
        if (car.available) {
          if (car.brand === brand) {
            cars.push(car)
          }

          if (car.category_id === category_id) {
            cars.push(car)
          }

          if (car.name === name) {
            cars.push(car)
          }
        }
      })

      return cars
    }

    return this.cars.filter((car) => car.available)
  }

  async updateAvailable(id: string, available: boolean): Promise<void> {
    const findIndex = this.cars.findIndex((car) => car.id === id)

    this.cars[findIndex].available = available
  }
}

export { CarsRepositoryInMemory }
