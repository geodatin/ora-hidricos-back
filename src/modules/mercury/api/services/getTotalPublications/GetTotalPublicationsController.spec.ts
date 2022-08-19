import request from 'supertest'
import { Connection, createConnection } from 'typeorm'

import { app } from '@shared/infrastructure/http/app'

let connection: Connection

describe('Get Total Publications Controller', () => {
  beforeAll(async () => {
    connection = await createConnection()
  })

  afterAll(async () => {
    await connection.close()
  })

  it('should return all the publications for fish contamination', async () => {
    const response = await request(app).get(
      `/api/mercury/fish/publications/total`
    )
    expect(response.body).toHaveProperty('count')
  })

  it('should return all the publications for human contamination', async () => {
    const response = await request(app).get(
      `/api/mercury/human/publications/total`
    )
    expect(response.body).toHaveProperty('count')
  })
})
