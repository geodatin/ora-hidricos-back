import request from 'supertest'
import { Connection, createConnection } from 'typeorm'

import { app } from '@shared/infrastructure/http/app'

let connection: Connection

describe('Get Illegal Mining Time Series Controller', () => {
  beforeAll(async () => {
    connection = await createConnection()
  })

  afterAll(async () => {
    await connection.close()
  })

  it('should return the Illegal Mining time series', async () => {
    const response = await request(app).get(
      `/api/mercury/fish/publications/time-series`
    )
    expect(response.body).toHaveProperty('x')
    expect(response.body).toHaveProperty('y')
  })

  it('should return the Illegal Mining time series for the specified country', async () => {
    const response = await request(app)
      .get(`/api/mercury/fish/publications/time-series`)
      .query({
        countryCode: 9,
      })
    expect(response.body).toHaveProperty('x')
    expect(response.body).toHaveProperty('y')
  })
})
