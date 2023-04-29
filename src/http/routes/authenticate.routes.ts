import { AuthenticateUserController } from '@modules/accounts/use-cases/authenticate-user/authenticate-user-controller'
import { RefreshTokenController } from '@modules/accounts/use-cases/refresh-token/refresh-token-controller'
import { Router } from 'express'

const authenticateRoutes = Router()

const authenticateUserController = new AuthenticateUserController()
const refreshTokenController = new RefreshTokenController()

authenticateRoutes.post('/sessions', authenticateUserController.handle)
authenticateRoutes.post('/refresh-token', refreshTokenController.handle)

export { authenticateRoutes }
