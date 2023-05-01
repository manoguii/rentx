import { Router } from 'express'
import multer from 'multer'
import uploadConfig from '@config/upload'
import { ensureAdmin } from '../middleware/ensureAdmin'
import { ensureAuthenticated } from '../middleware/ensureAuthenticated'
import { CreateCarController } from '@modules/cars/controllers/create-car-controller'
import { ListAvailableCarsController } from '@modules/cars/controllers/list-available-cars-controller'
import { CreateCarSpecificationController } from '@modules/cars/controllers/create-car-specification-controller'
import { UploadCarImagesController } from '@modules/cars/controllers/upload-car-images-controller'

const carsRoutes = Router()

const createCarController = new CreateCarController()
const listAvailableCarsController = new ListAvailableCarsController()
const createCarSpecificationController = new CreateCarSpecificationController()
const uploadCarImagesController = new UploadCarImagesController()

const upload = multer(uploadConfig.upload('./tmp/cars'))

carsRoutes.get('/available', listAvailableCarsController.handle)
carsRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle,
)
carsRoutes.post(
  '/specifications/:id',
  ensureAuthenticated,
  ensureAdmin,
  createCarSpecificationController.handle,
)
carsRoutes.post(
  '/images/:id',
  ensureAuthenticated,
  ensureAdmin,
  upload.array('images'),
  uploadCarImagesController.handle,
)

export { carsRoutes }
