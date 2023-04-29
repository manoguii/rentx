import { CreateRentalController } from '@modules/rentals/use-cases/create-rental/create-rental-controller'
import { DevolutionRentalController } from '@modules/rentals/use-cases/devolution-rental/devolution-rental-controller'
import { ListRentalsByUserController } from '@modules/rentals/use-cases/list-rentals-by-user/list-rentals-by-user-controller'
import { Router } from 'express'
import { ensureAuthenticated } from 'http/middleware/ensureAuthenticated'

const rentalRoutes = Router()

const createRentalController = new CreateRentalController()
const devolutionRentalController = new DevolutionRentalController()
const listRentalsByUserController = new ListRentalsByUserController()

rentalRoutes.post('/', ensureAuthenticated, createRentalController.handle)

rentalRoutes.post(
  '/devolution/:id',
  ensureAuthenticated,
  devolutionRentalController.handle,
)

rentalRoutes.get(
  '/user',
  ensureAuthenticated,
  listRentalsByUserController.handle,
)

export { rentalRoutes }
