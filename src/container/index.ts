import { container } from 'tsyringe'
import 'providers'
import { ICategoriesRepository } from '@modules/cars/repositories/interface/ICategoriesRepository'
import { CategoriesRepository } from '@modules/cars/repositories/categories-repository'
import { ISpecificationRepository } from '@modules/cars/repositories/interface/ISpecificationRepository'
import { SpecificationRepository } from '@modules/cars/repositories/specification-repository'
import { IUsersRepository } from '@modules/accounts/repositories/interface/IUsersRepository'
import { UsersRepository } from '@modules/accounts/repositories/users-repository'
import { ICarsRepository } from '@modules/cars/repositories/interface/ICarsRepository'
import { CarsRepository } from '@modules/cars/repositories/cars-repository'
import { ICarImagesRepository } from '@modules/cars/repositories/interface/ICarImagesRepository'
import { CarImagesRepository } from '@modules/cars/repositories/car-images-repository'
import { IRentalsRepository } from '../modules/rentals/repositories/interface/IRentalsRepository'
import { RentalsRepository } from '../modules/rentals/repositories/RentalsRepository'
import { UsersTokensRepository } from '@modules/accounts/repositories/users-tokens-repository'
import { IUsersTokensRepository } from '@modules/accounts/repositories/interface/IUsersTokensRepository'

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository,
)

container.registerSingleton<ISpecificationRepository>(
  'SpecificationRepository',
  SpecificationRepository,
)

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
)

container.registerSingleton<ICarsRepository>('CarsRepository', CarsRepository)

container.registerSingleton<ICarImagesRepository>(
  'CarImagesRepository',
  CarImagesRepository,
)

container.registerSingleton<IRentalsRepository>(
  'RentalsRepository',
  RentalsRepository,
)

container.registerSingleton<IUsersTokensRepository>(
  'UsersTokensRepository',
  UsersTokensRepository,
)
