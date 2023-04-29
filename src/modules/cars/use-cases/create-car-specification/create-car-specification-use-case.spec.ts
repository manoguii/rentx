import { beforeEach, describe, expect, it } from 'vitest'
import { AppError } from '@errors/AppError'
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory'
import { SpecificationRepositoryInMemory } from '@modules/cars/repositories/in-memory/SpecificationRepositoryInMemory'

import { CreateCarSpecificationUseCase } from './create-car-specification-use-case'

let createCarSpecificationUseCase: CreateCarSpecificationUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory
let specificationsRepositoryInMemory: SpecificationRepositoryInMemory

describe('Create Car Specification', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    specificationsRepositoryInMemory = new SpecificationRepositoryInMemory()
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationsRepositoryInMemory,
    )
  })

  it('should not be able to add a new specification to a now-existent car', async () => {
    const car_id = '123'

    const specifications_id = ['54321']

    await expect(
      createCarSpecificationUseCase.execute({ car_id, specifications_id }),
    ).rejects.toEqual(new AppError('Car does not exist !'))
  })

  it('should be able to add a new specification to the car', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car 1',
      description: 'test-car-description',
      daily_rate: 100,
      license_plate: 'ABC-123',
      fine_amount: 100,
      brand: 'test-brand',
      category_id: 'test-category-id',
    })

    const specification = await specificationsRepositoryInMemory.create({
      name: 'Motor',
      description: '4059 cavalos',
    })

    const carSpecification = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id: [specification.id],
    })

    expect(carSpecification).toHaveProperty('Specification')
    expect(carSpecification.Specification.length).toBe(1)
    expect(carSpecification.Specification[0]).toContain(specification)
  })
})
