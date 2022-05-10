import request from 'supertest'
import { Connection, createConnection } from 'typeorm'

import { app } from '@shared/infrastructure/http/app'

let connection: Connection

describe('Get Territory Name Controller', () => {
  beforeAll(async () => {
    connection = await createConnection()
  })

  afterAll(async () => {
    await connection.close()
  })

  it('should return the territories based on a search term', async () => {
    const response = await request(app).get(`/api/territory/a`)
    expect(response.status).toBe(200)
  })

  it('should have the name property', async () => {
    const response = await request(app).get(`/api/territory/a`)
    expect(response.body[0]).toHaveProperty('name')
  })

  it('should have the type property', async () => {
    const response = await request(app).get(`/api/territory/a`)
    expect(response.body[0]).toHaveProperty('type')
  })

  it('should have the code property', async () => {
    const response = await request(app).get(`/api/territory/a`)
    expect(response.body[0]).toHaveProperty('name')
  })
})
