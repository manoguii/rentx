import { ICreateCategoryDTO } from '@modules/cars/dtos/ICreateCategoryDTO'
import { Category } from '@prisma/client'

interface ICategoriesRepository {
  create({ name, description }: ICreateCategoryDTO): Promise<void>
  list(): Promise<Category[]>
  findByName(name: string): Promise<Category>
}

export { ICategoriesRepository }
