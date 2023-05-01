import 'reflect-metadata'
import dayjs from 'dayjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { AppError } from '@errors/AppError'
import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/in-memory/rentals-repository-in-memory'
import { CreateRentalUseCase } from './create-rental-use-case'
import { DayJsDateProvider } from '@providers/date-provider/implementations/day-js-date-provider'
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/cars-repository-in-memory'

let createRentalUseCase: CreateRentalUseCase
let rentalsRepositoryInMemory: RentalsRepositoryInMemory
let carsRepositoryInMemory: CarsRepositoryInMemory
let dayJsDateProvider: DayJsDateProvider

describe('Create Rental', () => {
  const dayAdd24Hours = dayjs().add(1, 'day').toDate()

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory()
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    dayJsDateProvider = new DayJsDateProvider()
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayJsDateProvider,
      carsRepositoryInMemory,
    )
  })

  it('should be able to create a new rental', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'testJest',
      description: 'test',
      daily_rate: 100,
      license_plate: 'test',
      fine_amount: 100,
      category_id: 'test',
      brand: 'test',
    })

    const rental = await createRentalUseCase.execute({
      car_id: car.id,
      user_id: '321',
      expected_return_date: dayAdd24Hours,
    })

    expect(rental).toHaveProperty('id')
    expect(rental).toHaveProperty('start_date')
  })

  it('should not be able to create a new rental if there is another open to the same user', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'testJest',
      description: 'test',
      daily_rate: 100,
      license_plate: 'test',
      fine_amount: 100,
      category_id: 'test',
      brand: 'test',
    })

    await createRentalUseCase.execute({
      car_id: car.id,
      user_id: '54321',
      expected_return_date: dayAdd24Hours,
    })

    await expect(
      createRentalUseCase.execute({
        car_id: '12345',
        user_id: '54321',
        expected_return_date: dayAdd24Hours,
      }),
    ).rejects.toEqual(new AppError("There's a rental in progress for user !"))
  })

  it('should not be able to create a new rental if there is another open to the same car', async () => {
    await rentalsRepositoryInMemory.create({
      car_id: 'testCar',
      expected_return_date: dayAdd24Hours,
      user_id: '12345',
    })

    await expect(
      createRentalUseCase.execute({
        car_id: 'testCar',
        user_id: '12345',
        expected_return_date: dayAdd24Hours,
      }),
    ).rejects.toEqual(new AppError('Car is unavailable !'))
  })

  it('should not be able to create a new rental with invalid return time', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'testJest',
      description: 'test',
      daily_rate: 100,
      license_plate: 'test',
      fine_amount: 100,
      category_id: 'test',
      brand: 'test',
    })

    await expect(
      createRentalUseCase.execute({
        car_id: car.id,
        user_id: '2222',
        expected_return_date: dayjs().toDate(),
      }),
    ).rejects.toEqual(new AppError('Return date must be at least 24 hours'))
  })
})
