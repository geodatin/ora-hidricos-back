import { Router } from 'express'

import { floodRoutes } from './flood.routes'
import { hgcAspectsRoutes } from './hgcAspects.routes'
import { hydroelectricRoutes } from './hydroelectric.routes'
import { mercuryRoutes } from './mercury.routes'
import { miningRoutes } from './mining.routes'
import { oilRoutes } from './oil.routes'
import { pollutionRoutes } from './pollution.routes'
import { populationRoutes } from './population.routes'
import { territoryRoutes } from './territory.routes'
import { vulnerabilityRoutes } from './vulnerability.routes'
import { waterSurfaceRoutes } from './waterSurface.routes'
import { waterUsersRoutes } from './waterUsers.routes'
import { waterwayRoutes } from './waterway.routes'

const routes = Router()

routes.use('/territory', territoryRoutes)
routes.use('/waterSurface', waterSurfaceRoutes)
routes.use('/waterUsers', waterUsersRoutes)
routes.use('/mercury', mercuryRoutes)
routes.use('/oil', oilRoutes)
routes.use('/flood', floodRoutes)
routes.use('/mining', miningRoutes)
routes.use('/waterway', waterwayRoutes)
routes.use('/pollution', pollutionRoutes)
routes.use('/hydroelectric', hydroelectricRoutes)
routes.use('/population', populationRoutes)
routes.use('/hydrogeochemistry', hgcAspectsRoutes)
routes.use('/vulnerability', vulnerabilityRoutes)

export { routes }
