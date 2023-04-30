import { AuthenticateUserController } from '@modules/accounts/controllers/authenticate-user-controller'
import { RefreshTokenController } from '@modules/accounts/controllers/refresh-token-controller'
import { Router } from 'express'

const authenticateRoutes = Router()

const authenticateUserController = new AuthenticateUserController()
const refreshTokenController = new RefreshTokenController()

authenticateRoutes.post('/sessions', authenticateUserController.handle)
authenticateRoutes.post('/refresh-token', refreshTokenController.handle)

export { authenticateRoutes }
