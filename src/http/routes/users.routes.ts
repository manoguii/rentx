import { Router } from 'express'
import multer from 'multer'
import uploadConfig from '@config/upload'
import { ensureAuthenticated } from '../middleware/ensureAuthenticated'
import { UserController } from '@modules/accounts/controllers/create-user-controller'
import { UpdateUserAvatarController } from '@modules/accounts/controllers/update-user-avatar-controller'

const usersRoutes = Router()

const uploadAvatar = multer(uploadConfig.upload('./tmp/avatar'))

const createUserController = new UserController()
const updateUserAvatarController = new UpdateUserAvatarController()

usersRoutes.post('/', createUserController.handle)
usersRoutes.patch(
  '/avatar',
  ensureAuthenticated,
  uploadAvatar.single('avatar'),
  updateUserAvatarController.handle,
)

export { usersRoutes }
