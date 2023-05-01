import { app } from '@http/app'
import request from 'supertest'

import { describe, expect, it } from 'vitest'

describe('Create category controller', () => {
  it('should be able to list all categories', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@rentx.com',
      password: 'admin',
    })

    const { token } = responseToken.body

    await request(app)
      .post('/categories')
      .send({
        name: 'category-name-car-test',
        description: 'description-category-car-test',
      })
      .set({
        Authorization: `Bearer ${token}`,
      })

    const response = await request(app).get('/categories')

    expect(response.status).toBe(200)
    expect(response.body.length).toBe(1)
    expect(response.body[0]).toHaveProperty('id')
    expect(response.body[0].name).toEqual('category-name-car-test')
  })
})
