import request from 'supertest'
import { Connection, createConnection } from 'typeorm'

import { app } from '@shared/infrastructure/http/app'

let connection: Connection

describe('Get Time Series Controller', () => {
  beforeAll(async () => {
    connection = await createConnection()
  })

  afterAll(async () => {
    await connection.close()
  })

  it('should return the time series for the country', async () => {
    const response = await request(app).get(
      `/api/waterSurface/timeSeries/country`
    )
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('x')
    expect(response.body).toHaveProperty('y')
    expect(response.body.y).toBeInstanceOf(Array)
  })

  it('should return the time series for the city', async () => {
    const response = await request(app)
      .get(`/api/waterSurface/timeSeries/city`)
      .query({ code: 887 })
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('x')
    expect(response.body).toHaveProperty('y')
    expect(response.body.y).toBeInstanceOf(Array)
  })

  it('should return the time series for the state', async () => {
    const response = await request(app)
      .get(`/api/waterSurface/timeSeries/state`)
      .query({ code: 1 })
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('x')
    expect(response.body).toHaveProperty('y')
    expect(response.body.y).toBeInstanceOf(Array)
  })

  it('should not return the time series for inexistent territory type', async () => {
    const response = await request(app).get(
      `/api/waterSurface/timeSeries/inexistent`
    )
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('message')
    expect(response.body.message).toStrictEqual('Invalid territory type!')
  })

  it('should not return the time series for city or state without code', async () => {
    const response = await request(app).get(`/api/waterSurface/timeSeries/city`)
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('message')
    expect(response.body.message).toStrictEqual(
      'Code is required for city territory type!'
    )
  })
})
