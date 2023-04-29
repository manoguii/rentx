import { beforeEach, describe, expect, it } from 'vitest'
import 'reflect-metadata'
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory'

import { ListAvailableCarsUseCase } from './list-available-cars-use-case'

let listAvailableCarsUseCase: ListAvailableCarsUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory

describe('List Cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory,
    )
  })

  it('should be able to list all available cars', async () => {
    await carsRepositoryInMemory.create({
      name: 'car-test',
      description: 'description-test',
      daily_rate: 230,
      license_plate: 'KDF-258',
      fine_amount: 80,
      brand: 'brand-test',
      category_id: 'category_id-test',
    })

    await carsRepositoryInMemory.create({
      name: 'car-test-2',
      description: 'description-test-2',
      daily_rate: 230,
      license_plate: 'SAD-258',
      fine_amount: 80,
      brand: 'brand-test-2',
      category_id: 'category_id-test-2',
    })

    const cars = await listAvailableCarsUseCase.execute({
      brand: '',
      category_id: '',
      name: '',
    })

    expect(cars).toHaveLength(2)
  })

  it('should be able to list all available cars by brand', async () => {
    await carsRepositoryInMemory.create({
      name: 'car-test',
      description: 'description-test',
      daily_rate: 230,
      license_plate: 'KDF-258',
      fine_amount: 80,
      brand: 'Honda',
      category_id: 'category_id-test',
    })

    await carsRepositoryInMemory.create({
      name: 'car-test2',
      description: 'description-test2',
      daily_rate: 230,
      license_plate: 'DVB-258',
      fine_amount: 80,
      brand: 'Audi',
      category_id: 'category_id-test',
    })

    const cars = await listAvailableCarsUseCase.execute({ brand: 'Audi' })

    expect(cars).toHaveLength(1)
    expect(cars[0].brand).toBe('Audi')
  })

  it('should be able to list all available cars by name', async () => {
    await carsRepositoryInMemory.create({
      name: 'Civic',
      description: 'description-test',
      daily_rate: 230,
      license_plate: 'KDF-258',
      fine_amount: 80,
      brand: 'Honda',
      category_id: 'category_id-test',
    })

    await carsRepositoryInMemory.create({
      name: 'BMW A3',
      description: 'description-test2',
      daily_rate: 230,
      license_plate: 'DVB-258',
      fine_amount: 80,
      brand: 'bmw',
      category_id: 'category_id-test',
    })

    const cars = await listAvailableCarsUseCase.execute({ name: 'BMW A3' })

    expect(cars).toHaveLength(1)
    expect(cars[0].name).toBe('BMW A3')
  })

  it('should be able to list all available cars by category_id', async () => {
    await carsRepositoryInMemory.create({
      name: 'Civic',
      description: 'description-test',
      daily_rate: 230,
      license_plate: 'KDF-258',
      fine_amount: 80,
      brand: 'Honda',
      category_id: 'category-id-teste-civic',
    })

    await carsRepositoryInMemory.create({
      name: 'BMW A3',
      description: 'description-test2',
      daily_rate: 230,
      license_plate: 'DVB-258',
      fine_amount: 80,
      brand: 'bmw',
      category_id: 'category-id-teste-bmw',
    })

    const cars = await listAvailableCarsUseCase.execute({
      category_id: 'category-id-teste-civic',
    })

    expect(cars).toHaveLength(1)
    expect(cars[0].category_id).toBe('category-id-teste-civic')
  })

  it('should be able to list all available cars by more than one category', async () => {
    const carHonda = await carsRepositoryInMemory.create({
      name: 'Civic',
      description: 'description-test',
      daily_rate: 230,
      license_plate: 'KDF-258',
      fine_amount: 80,
      brand: 'honda',
      category_id: 'category-id-teste-civic',
    })

    const carBmw = await carsRepositoryInMemory.create({
      name: 'BMW A3',
      description: 'description-test2',
      daily_rate: 230,
      license_plate: 'DVB-258',
      fine_amount: 80,
      brand: 'bmw',
      category_id: 'category-id-teste-bmw',
    })

    await carsRepositoryInMemory.create({
      name: 'Fiat uno',
      description: 'description-test2',
      daily_rate: 230,
      license_plate: 'DVB-258',
      fine_amount: 80,
      brand: 'fiat',
      category_id: 'category-id-teste-fiat',
    })

    const cars = await listAvailableCarsUseCase.execute({
      category_id: 'category-id-teste-civic',
      name: 'BMW A3',
    })

    expect(cars).toHaveLength(2)
    expect(cars).toContain(carHonda)
    expect(cars).toContain(carBmw)
  })

  it('should not be able to list unavailable cars', async () => {
    const carHonda = await carsRepositoryInMemory.create({
      name: 'Civic',
      description: 'description-test',
      daily_rate: 230,
      license_plate: 'KDF-258',
      fine_amount: 80,
      brand: 'honda',
      category_id: 'category-id-teste-civic',
    })

    const carBmw = await carsRepositoryInMemory.create({
      name: 'BMW A3',
      description: 'description-test2',
      daily_rate: 230,
      license_plate: 'DVB-258',
      fine_amount: 80,
      brand: 'bmw',
      category_id: 'category-id-teste-bmw',
    })

    carHonda.available = false
    carBmw.available = false

    const cars = await listAvailableCarsUseCase.execute({})

    expect(cars).toHaveLength(0)
  })
})
