import { Router } from 'express'

import { territoryRoutes } from './territory.routes'
import { waterSurfaceRoutes } from './waterSurface.routes'

const routes = Router()

routes.use('/territory', territoryRoutes)
routes.use('/waterSurface', waterSurfaceRoutes)

export { routes }
