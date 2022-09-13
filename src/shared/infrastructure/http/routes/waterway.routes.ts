import { GetShapeAsMvtController } from '@modules/waterResources/api/services/getShapeAsMvt/GetShapeAsMvtController'
import { GetShapeAsTilesController } from '@modules/waterResources/api/services/getShapeAsTiles/GetShapeAsGeoJsonController'
import { Router } from 'express'

import { checkTile } from '../middlewares/checkTile'

export const waterwayRoutes = Router()

const getShapeAsMvtController = new GetShapeAsMvtController()
const getShapeAsTilesController = new GetShapeAsTilesController()

waterwayRoutes.get(
  '/tiles/:z/:x/:y.:format',
  checkTile,
  getShapeAsMvtController.handle
)

waterwayRoutes.get('/tiles/image', getShapeAsTilesController.handle)
