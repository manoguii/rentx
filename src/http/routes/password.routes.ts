import { ResetPasswordUserController } from '@modules/accounts/controllers/reset-password-user-controller'
import { SendForgotPasswordMailController } from '@modules/accounts/controllers/send-forgot-password-mail-controller'
import { Router } from 'express'

const passwordRoutes = Router()

const sendForgotPasswordMailController = new SendForgotPasswordMailController()
const resetPasswordUserController = new ResetPasswordUserController()

passwordRoutes.post('/forgot', sendForgotPasswordMailController.handle)
passwordRoutes.post('/reset', resetPasswordUserController.handle)

export { passwordRoutes }
