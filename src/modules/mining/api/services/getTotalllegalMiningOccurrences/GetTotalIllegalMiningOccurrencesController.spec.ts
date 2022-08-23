import request from 'supertest'
import { Connection, createConnection } from 'typeorm'

import { app } from '@shared/infrastructure/http/app'

let connection: Connection

describe('Get Total Illegal Mining Occurrences Controller', () => {
  beforeAll(async () => {
    connection = await createConnection()
  })

  afterAll(async () => {
    await connection.close()
  })

  it('should return all the Illegal Mining Occurrences', async () => {
    const response = await request(app).get(
      `/api/mining/illegal/total/occurrences`
    )
    expect(response.body).toHaveProperty('count')
  })

  it('should return all the Illegal Mining Occurrences for specified country', async () => {
    const response = await request(app)
      .get(`/api/mining/illegal/total/occurrences`)
      .query({
        countryCode: 9,
      })
    expect(response.body).toHaveProperty('count')
  })
})
