import { app } from '@http/app'
import request from 'supertest'

import { describe, expect, it } from 'vitest'

describe('Create category controller', () => {
  it('should be able to create a new category', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@rentx.com',
      password: 'admin',
    })

    const { token } = responseToken.body

    const response = await request(app)
      .post('/categories')
      .send({
        name: 'category-name-car-test',
        description: 'description-category-car-test',
      })
      .set({
        Authorization: `Bearer ${token}`,
      })

    expect(response.status).toBe(201)
  })
})
