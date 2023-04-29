import { beforeEach, describe, expect, it } from 'vitest'
import 'reflect-metadata'
import { AppError } from '@errors/AppError'
import { CategoriesRepositoryInMemory } from '@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory'

import { CreateCategoryUseCase } from './create-category-use-case'

let createCategoryUseCase: CreateCategoryUseCase
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory

describe('Create Category', () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory()
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory,
    )
  })

  it('should be able to create a new category', async () => {
    const category = {
      name: 'Category Test',
      description: 'Category description Test',
    }

    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description,
    })

    const categoryCreated = await categoriesRepositoryInMemory.findByName(
      category.name,
    )

    const regexUUID =
      /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi

    expect(categoryCreated.id).toMatch(regexUUID)
    expect(categoryCreated).toHaveProperty('id')
    expect(categoryCreated.name).toBe('Category Test')
  })

  it('should not be able to create a new category whit same name exists', async () => {
    const category = {
      name: 'Category Test',
      description: 'Category description Test',
    }

    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description,
    })

    await expect(
      createCategoryUseCase.execute({
        name: category.name,
        description: category.description,
      }),
    ).rejects.toEqual(new AppError('Category already exists'))
  })
})
