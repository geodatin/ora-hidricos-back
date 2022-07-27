import { Router } from 'express'

import { mercuryRoutes } from './mercury.routes'
import { territoryRoutes } from './territory.routes'
import { waterSurfaceRoutes } from './waterSurface.routes'

const routes = Router()

routes.use('/territory', territoryRoutes)
routes.use('/waterSurface', waterSurfaceRoutes)
routes.use('/mercury', mercuryRoutes)

export { routes }
