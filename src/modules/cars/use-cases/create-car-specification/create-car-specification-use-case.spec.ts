import { beforeEach, describe, expect, it } from 'vitest'
import { AppError } from '@errors/AppError'
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory'
import { SpecificationRepositoryInMemory } from '@modules/cars/repositories/in-memory/SpecificationRepositoryInMemory'

import { CreateCarSpecificationUseCase } from './create-car-specification-use-case'
import { Car, Specification } from '@prisma/client'

let createCarSpecificationUseCase: CreateCarSpecificationUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory
let specificationsRepositoryInMemory: SpecificationRepositoryInMemory

let carBMW: Car
let specification_motor: Specification
let specification_acceleration: Specification

describe('Create Car Specification', () => {
  beforeEach(async () => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    specificationsRepositoryInMemory = new SpecificationRepositoryInMemory()
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationsRepositoryInMemory,
    )

    carBMW = await carsRepositoryInMemory.create({
      name: 'X1 (E84)',
      description: 'LCI xDrive20i 2012',
      daily_rate: 420,
      license_plate: 'BGD-854',
      fine_amount: 710,
      brand: 'BMW',
      category_id: 'test-category-id',
    })

    specification_motor = await specificationsRepositoryInMemory.create({
      name: 'Motor',
      description: 'Potência: 184 PS or 181 bhp or 135 kW @ 5000-6250 rpm',
    })

    specification_acceleration = await specificationsRepositoryInMemory.create({
      name: 'Aceleração',
      description: 'Velocidade Máxima	215 km/h',
    })
  })

  it('should not be able to add a new specification to a now-existent car', async () => {
    const car_id = '123'

    const specifications_id = ['54321']

    await expect(
      createCarSpecificationUseCase.execute({ car_id, specifications_id }),
    ).rejects.toEqual(new AppError('Car does not exist !'))
  })

  it('should be able to add a new specification to the car', async () => {
    const carSpecification = await createCarSpecificationUseCase.execute({
      car_id: carBMW.id,
      specifications_id: [
        specification_motor.id,
        specification_acceleration.id,
      ],
    })

    expect(carSpecification).toHaveProperty('Specification')
    expect(carSpecification.Specification.length).toBe(2)
    expect(carSpecification.Specification[0]).toContain(specification_motor)
  })
})
