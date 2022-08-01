import request from 'supertest'
import { Connection, createConnection } from 'typeorm'

import { app } from '@shared/infrastructure/http/app'

let connection: Connection

describe('Get Oil Field Points Controller', () => {
  beforeAll(async () => {
    connection = await createConnection()
  })

  afterAll(async () => {
    await connection.close()
  })

  it('should return the points for the oil fields', async () => {
    const response = await request(app).get(`/api/oil/field/points`)
    expect(response.body).toHaveProperty('features')
    expect(response.body).toHaveProperty('type')
  })

  it('should return the unique point when code is passed', async () => {
    const response = await request(app).get(`/api/oil/field/points`).query({
      code: 'fa9714fa-569a-4977-ba7a-a19d8b18fade',
    })
    expect(response.body).toHaveProperty('features')
    expect(response.body).toHaveProperty('type')
  })

  it('should return error for non existent point', async () => {
    const response = await request(app).get(`/api/oil/field/points`).query({
      code: 'non-existent',
    })
    expect(response.body).toHaveProperty('message')
    expect(response.body.message).toEqual('Informed code does not exist')
  })
})
