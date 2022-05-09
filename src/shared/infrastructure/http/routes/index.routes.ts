import { Router } from 'express'

import { territoryRoutes } from './territory.routes'

const routes = Router()

routes.use('/territory', territoryRoutes)

export { routes }
