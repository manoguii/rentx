import { beforeEach, describe, expect, it } from 'vitest'
import 'reflect-metadata'

import { ListCategoriesUseCase } from './list-categories-use-case'
import { CategoriesRepositoryInMemory } from '../repositories/in-memory/categories-repository-in-memory'

let listCategoriesUseCase: ListCategoriesUseCase
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory

describe('List Categories', () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory()
    listCategoriesUseCase = new ListCategoriesUseCase(
      categoriesRepositoryInMemory,
    )
  })

  it('should be able to list all categories', async () => {
    await categoriesRepositoryInMemory.create({
      name: 'category-test',
      description: 'description-test',
    })

    await categoriesRepositoryInMemory.create({
      name: 'category-motor-test',
      description: 'description-test',
    })

    const categories = await listCategoriesUseCase.execute()

    const regexUUID =
      /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi

    expect(categories[0].id).toMatch(regexUUID)
    expect(categories).toHaveLength(2)
    expect(categories[0]).toHaveProperty('id')
  })
})
