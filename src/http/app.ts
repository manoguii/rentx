import 'reflect-metadata'
import express, { NextFunction, Request, Response } from 'express'
import 'express-async-errors'
import swaggerUi from 'swagger-ui-express'

import '../container'

import swaggerFile from '../swagger.json'
import { router } from './routes'
import { AppError } from '@errors/AppError'

const app = express()

app.use(express.json())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use(router)

app.use(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      response.status(err.statusCode).json({ message: err.message })
    }

    return response.status(500).json({
      status: 'error',
      message: `Internal server error --- ${err.message} 😭😭😭`,
    })
  },
)

export { app }
