import { Category } from '@prisma/client'
import { ICategoriesRepository } from './interface/ICategoriesRepository'
import { ICreateCategoryDTO } from '../dtos/ICreateCategoryDTO'
import { prisma } from '@lib/prisma'

class CategoriesRepository implements ICategoriesRepository {
  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    await prisma.category.create({
      data: {
        name,
        description,
      },
    })
  }

  async list(): Promise<Category[]> {
    const categories = await prisma.category.findMany()

    return categories
  }

  async findByName(name: string): Promise<Category> {
    // select * from categories where name = "name" limit 1
    const category = await prisma.category.findUnique({
      where: {
        name,
      },
    })

    return category
  }
}

export { CategoriesRepository }
