import { beforeEach, describe, expect, it } from 'vitest'
import 'reflect-metadata'
import { AppError } from '@errors/AppError'
import { SpecificationRepositoryInMemory } from '@modules/cars/repositories/in-memory/SpecificationRepositoryInMemory'
import { CreateSpecificationUseCase } from './create-specification-use-case'

let createSpecificationUseCase: CreateSpecificationUseCase
let specificationRepositoryInMemory: SpecificationRepositoryInMemory

describe('Create Specification', () => {
  beforeEach(() => {
    specificationRepositoryInMemory = new SpecificationRepositoryInMemory()
    createSpecificationUseCase = new CreateSpecificationUseCase(
      specificationRepositoryInMemory,
    )
  })

  it('should be able to create a new specification', async () => {
    const specification = {
      name: 'specification-test',
      description: 'description-test',
    }

    await createSpecificationUseCase.execute({
      name: specification.name,
      description: specification.description,
    })

    const specificationCreated =
      await specificationRepositoryInMemory.findByName(specification.name)

    const regexUUID =
      /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi

    expect(specificationCreated.id).toMatch(regexUUID)
    expect(specificationCreated).toHaveProperty('id')
    expect(specificationCreated.name).toBe('specification-test')
  })

  it('should not be able to create a new specification whit same name exists', async () => {
    const specification = {
      name: 'specification-test',
      description: 'description-test',
    }

    await createSpecificationUseCase.execute({
      name: specification.name,
      description: specification.description,
    })

    await expect(
      createSpecificationUseCase.execute({
        name: specification.name,
        description: specification.description,
      }),
    ).rejects.toEqual(new AppError('Specification already exists!'))
  })
})
