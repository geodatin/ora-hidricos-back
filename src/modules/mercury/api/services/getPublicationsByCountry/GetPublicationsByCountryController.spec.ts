import request from 'supertest'
import { Connection, createConnection } from 'typeorm'

import { app } from '@shared/infrastructure/http/app'

let connection: Connection

describe('Get Publications by country Controller', () => {
  beforeAll(async () => {
    connection = await createConnection()
  })

  afterAll(async () => {
    await connection.close()
  })

  it('should return the points for the fish mercury occurrence', async () => {
    const response = await request(app).get(
      `/api/mercury/human/publications/country`
    )
    console.log(response.body)
    expect(Array.isArray(response.body)).toBe(true)
  })
})
