import request from 'supertest'
import { Connection, createConnection } from 'typeorm'

import { app } from '@shared/infrastructure/http/app'

let connection: Connection
let rankingType: string

describe('Get Ranking Controller', () => {
  beforeAll(async () => {
    connection = await createConnection()
    rankingType = 'winLoss'
  })

  afterAll(async () => {
    await connection.close()
  })

  it('should return the ranking for the country', async () => {
    const response = await request(app).get(
      `/api/waterSurface/ranking/country/${rankingType}`
    )
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('x')
    expect(response.body).toHaveProperty('series')
    expect(response.body).toHaveProperty('position')
    expect(response.body).toHaveProperty('pages')
  })

  it('should return the ranking for the city', async () => {
    const response = await request(app)
      .get(`/api/waterSurface/ranking/city/${rankingType}`)
      .query({ code: 701 })
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('x')
    expect(response.body).toHaveProperty('series')
    expect(response.body).toHaveProperty('position')
    expect(response.body).toHaveProperty('pages')
    expect(response.body).toHaveProperty('focusPage')
  })

  it('should return the ranking for the state', async () => {
    const response = await request(app)
      .get(`/api/waterSurface/ranking/state/${rankingType}`)
      .query({ code: 1 })
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('x')
    expect(response.body).toHaveProperty('series')
    expect(response.body).toHaveProperty('position')
    expect(response.body).toHaveProperty('pages')
    expect(response.body).toHaveProperty('focusPage')
  })

  it('should return correct focusPage according to the passed code', async () => {
    const expected = ['Yanatile (Perú)']

    const {
      body: { focusPage },
    } = await request(app)
      .get(`/api/waterSurface/ranking/city/${rankingType}`)
      .query({ code: 701 })

    const response = await request(app)
      .get(`/api/waterSurface/ranking/city/${rankingType}`)
      .query({ page: focusPage, code: 701 })

    expect(response.body.x).toEqual(expect.arrayContaining(expected))
  })

  it('should not return the ranking for inexistent territory type', async () => {
    const response = await request(app).get(
      `/api/waterSurface/ranking/inexistent/${rankingType}`
    )
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('message')
    expect(response.body.message).toStrictEqual('Invalid territory type!')
  })

  it('should not return the ranking for city or state without code', async () => {
    const responseCity = await request(app).get(
      `/api/waterSurface/ranking/city/${rankingType}`
    )
    expect(responseCity.status).toBe(400)
    expect(responseCity.body).toHaveProperty('message')
    expect(responseCity.body.message).toStrictEqual(
      'Code is required for city territory type!'
    )
    const responseState = await request(app).get(
      `/api/waterSurface/ranking/state/${rankingType}`
    )
    expect(responseState.status).toBe(400)
    expect(responseState.body).toHaveProperty('message')
    expect(responseState.body.message).toStrictEqual(
      'Code is required for state territory type!'
    )
  })

  it('should not return the ranking for inexistent ranking type', async () => {
    const response = await request(app).get(
      `/api/waterSurface/ranking/city/inexistent`
    )
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('message')
    expect(response.body.message).toStrictEqual('Invalid ranking type!')
  })
})
