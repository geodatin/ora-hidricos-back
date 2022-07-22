import env from 'dotenv-safe'
import { createConnection } from 'typeorm'

import { databaseLog } from '@shared/utils/log'

env.config()
createConnection().then((connection) => {
  databaseLog(connection)
})
