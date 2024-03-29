import cors from 'cors'
import express from 'express'
import 'express-async-errors'
import swagger from 'swagger-ui-express'

import '@shared/infrastructure/database/utils/formatPgResponse'
import '../database'
import '../../container'
import '@shared/earthengine'
import { checkError } from '@shared/errors/checkError'

import docs from '../../../../docs/docs.json'
import { routes } from './routes/index.routes'

const app = express()

app.use(
  '/api/docs',
  swagger.serve,
  swagger.setup(docs, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'Ora Hydric Documentation',
  })
)
app.use(express.json())
app.use(cors())
app.use('/api', routes)
app.use(checkError)

export { app }
