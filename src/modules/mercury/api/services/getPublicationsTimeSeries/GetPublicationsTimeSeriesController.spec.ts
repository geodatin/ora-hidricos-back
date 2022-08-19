import request from 'supertest'
import { Connection, createConnection } from 'typeorm'

import { app } from '@shared/infrastructure/http/app'

let connection: Connection

describe('Get Publications Time Series Controller', () => {
  beforeAll(async () => {
    connection = await createConnection()
  })

  afterAll(async () => {
    await connection.close()
  })

  it('should return the time publication time series for the fish mercury occurrence', async () => {
    const response = await request(app).get(
      `/api/mercury/fish/publications/time-series`
    )
    expect(response.body).toHaveProperty('x')
    expect(response.body).toHaveProperty('y')
  })
})
