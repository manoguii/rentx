import { inject, injectable } from 'tsyringe'

import { Category } from '@prisma/client'
import { ICategoriesRepository } from '@modules/cars/repositories/interface/ICategoriesRepository'

@injectable()
class ListCategoriesUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  async execute(): Promise<Category[]> {
    const categories = await this.categoriesRepository.list()

    return categories
  }
}

export { ListCategoriesUseCase }
