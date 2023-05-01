import { app } from '@http/app'
import request from 'supertest'

import { describe, expect, it } from 'vitest'

describe('Create car controller', () => {
  it('should be able to create a new car', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@rentx.com',
      password: 'admin',
    })

    const { token } = responseToken.body

    await request(app)
      .post('/categories')
      .send({
        name: 'Hatch',
        description: 'Carro curto',
      })
      .set({
        Authorization: `Bearer ${token}`,
      })

    const { body } = await request(app).get('/categories').send({
      name: 'Hatch',
      description: 'Carro curto',
    })

    const category_id = body[0].id

    const response = await request(app)
      .post('/cars')
      .send({
        id: '14dde0f3-1ff5-4539-bed7-4585a9cc06e6',
        name: 'Uno',
        description: 'Otimo carro, ano 1994, motor melhor que da ferrari',
        daily_rate: 190,
        available: true,
        license_plate: 'HSD-237',
        fine_amount: 80,
        brand: 'Fiat',
        created_at: '2023-04-30T23:51:46.706Z',
        category_id,
      })
      .set({
        Authorization: `Bearer ${token}`,
      })

    const regexUUID =
      /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi

    expect(response.body.id).toMatch(regexUUID)
    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('id')
    expect(response.body.available).toBe(true)
  })
})
