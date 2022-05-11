import request from 'supertest'
import { Connection, createConnection } from 'typeorm'

import { app } from '@shared/infrastructure/http/app'

let connection: Connection

describe('Get Statistics Controller', () => {
  beforeAll(async () => {
    connection = await createConnection()
  })

  afterAll(async () => {
    await connection.close()
  })

  it('should return the statistics for the country', async () => {
    const response = await request(app).get(
      `/api/waterSurface/statistics/country`
    )
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('currentArea')
    expect(response.body).toHaveProperty('winLossArea')
    expect(response.body).toHaveProperty('winLossPercent')
  })

  it('should return the statistics for the city', async () => {
    const response = await request(app)
      .get(`/api/waterSurface/statistics/city`)
      .query({ code: 887 })
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('currentArea')
    expect(response.body).toHaveProperty('winLossArea')
    expect(response.body).toHaveProperty('winLossPercent')
  })

  it('should return the statistics for the state', async () => {
    const response = await request(app)
      .get(`/api/waterSurface/statistics/state`)
      .query({ code: 1 })
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('currentArea')
    expect(response.body).toHaveProperty('winLossArea')
    expect(response.body).toHaveProperty('winLossPercent')
  })

  it('should not return the statistics for inexistent territory type', async () => {
    const response = await request(app).get(
      `/api/waterSurface/statistics/inexistent`
    )
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('message')
    expect(response.body.message).toStrictEqual('Invalid territory type!')
  })

  it('should not return the statistics for city or state without code', async () => {
    const response = await request(app).get(`/api/waterSurface/statistics/city`)
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('message')
    expect(response.body.message).toStrictEqual(
      'Code is required for city territory type!'
    )
  })
})
