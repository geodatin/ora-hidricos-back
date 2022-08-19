import request from 'supertest'
import { Connection, createConnection } from 'typeorm'

import { app } from '@shared/infrastructure/http/app'

let connection: Connection

describe('Get Mercury Points Controller', () => {
  beforeAll(async () => {
    connection = await createConnection()
  })

  afterAll(async () => {
    await connection.close()
  })

  it('should return the points for the fish mercury occurrence', async () => {
    const response = await request(app).get(`/api/mercury/fish/points`)
    expect(response.body).toHaveProperty('features')
    expect(response.body).toHaveProperty('type')
  })

  it('should return the points for the human mercury occurrence', async () => {
    const response = await request(app).get(`/api/mercury/human/points`)
    expect(response.body).toHaveProperty('features')
    expect(response.body).toHaveProperty('type')
  })

  it('should return the points for the human mercury occurrence is a specific country', async () => {
    const response = await request(app).get(`/api/mercury/human/points`).query({
      countryCode: 9,
    })
    expect(response.body).toHaveProperty('features')
    expect(response.body).toHaveProperty('type')
  })

  it('should return the points for the fish mercury occurrence is a specific country', async () => {
    const response = await request(app).get(`/api/mercury/fish/points`).query({
      countryCode: 9,
    })
    expect(response.body).toHaveProperty('features')
    expect(response.body).toHaveProperty('type')
  })
})
