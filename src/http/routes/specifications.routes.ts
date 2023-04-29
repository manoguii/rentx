import { Router } from 'express'

import { ensureAdmin } from '../middleware/ensureAdmin'
import { ensureAuthenticated } from '../middleware/ensureAuthenticated'
import { CreateSpecificationController } from '@modules/cars/use-cases/create-specification/create-specification-controller'

const specificationsRoutes = Router()

const createSpecificationController = new CreateSpecificationController()

specificationsRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createSpecificationController.handle,
)

export { specificationsRoutes }
