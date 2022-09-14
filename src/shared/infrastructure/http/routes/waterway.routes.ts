import { GetPropertiesController } from '@modules/waterResources/api/services/getProperties/GetPropertiesController'
import { GetShapeAsMvtController } from '@modules/waterResources/api/services/getShapeAsMvt/GetShapeAsMvtController'
import { GetShapeAsTilesController } from '@modules/waterResources/api/services/getShapeAsTiles/GetShapeAsGeoJsonController'
import { GetTotalController } from '@modules/waterResources/api/services/getTotal/GetTotalController'
import { Router } from 'express'

import { checkTile } from '../middlewares/checkTile'

export const waterwayRoutes = Router()

const getShapeAsMvtController = new GetShapeAsMvtController()
const getShapeAsTilesController = new GetShapeAsTilesController()
const getPropertiesController = new GetPropertiesController()
const getTotalController = new GetTotalController()

waterwayRoutes.get(
  '/tiles/:z/:x/:y.:format',
  checkTile,
  getShapeAsMvtController.handle
)
waterwayRoutes.get('/tiles/image', getShapeAsTilesController.handle)
waterwayRoutes.get(
  '/properties/tiles/:long/:lat',
  getPropertiesController.handle
)
waterwayRoutes.get('/total', getTotalController.handle)
