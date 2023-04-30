import 'reflect-metadata'
import { beforeEach, describe, expect, it } from 'vitest'
import { AppError } from '@errors/AppError'

import { CreateCarUseCase } from './create-car-use-case'
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/cars-repository-in-memory'

let createCarUseCase: CreateCarUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory

describe('Create Car', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory)
  })

  it('should be able to create a new car', async () => {
    const car = await createCarUseCase.execute({
      name: 'test-car',
      description: 'test-car-description',
      daily_rate: 100,
      license_plate: 'ABC-123',
      fine_amount: 100,
      brand: 'test-brand',
      category_id: 'test-category-id',
    })

    const regexUUID =
      /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi

    expect(car.id).toMatch(regexUUID)
    expect(car).toHaveProperty('id')
  })

  it('should not be able to create a car with exists license plate', async () => {
    await createCarUseCase.execute({
      name: 'test-car',
      description: 'test-description',
      daily_rate: 100,
      fine_amount: 100,
      brand: 'test-brand',
      category_id: 'test-category-id',
      license_plate: 'ABC-123',
    })

    await expect(
      createCarUseCase.execute({
        name: 'test-car',
        description: 'test-description',
        daily_rate: 100,
        fine_amount: 100,
        brand: 'test-brand',
        category_id: 'test-category-id',
        license_plate: 'ABC-123',
      }),
    ).rejects.toEqual(new AppError('Car Already Exists!'))
  })

  it('should be able to create a car with available true by default', async () => {
    const car = await createCarUseCase.execute({
      name: 'test-car',
      description: 'test-description',
      daily_rate: 100,
      fine_amount: 100,
      brand: 'test-brand',
      category_id: 'test-category-id',
      license_plate: 'ABC-123',
    })

    expect(car.available).toBe(true)
  })
})
