import request from 'supertest'
import { Connection, createConnection } from 'typeorm'

import { app } from '@shared/infrastructure/http/app'

let connection: Connection

describe('Get illegal mining Points Controller', () => {
  beforeAll(async () => {
    connection = await createConnection()
  })

  afterAll(async () => {
    await connection.close()
  })

  it('should return the points for the illegal mining sites', async () => {
    const response = await request(app).get(`/api/mining/illegal/points`)
    expect(response.body).toHaveProperty('features')
    expect(response.body).toHaveProperty('type')
  })

  it('should return the unique point when code is passed', async () => {
    const response = await request(app)
      .get(`/api/mining/illegal/points`)
      .query({
        code: '62c5abb6-0706-4549-9d37-fb2e4bf0fa35',
      })
    expect(response.body).toHaveProperty('features')
    expect(response.body).toHaveProperty('type')
  })

  it('should return error for non existent point', async () => {
    const response = await request(app)
      .get(`/api/mining/illegal/points`)
      .query({
        code: 'non-existent',
      })
    expect(response.body).toHaveProperty('message')
    expect(response.body.message).toEqual('Informed code does not exist')
  })
})
