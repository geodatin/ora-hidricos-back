import { GetShapeAsMvtController } from '@modules/waterResources/api/services/getShapeAsMvt/GetShapeAsMvtController'
import { Router } from 'express'

import { checkTile } from '../middlewares/checkTile'

export const waterwayRoutes = Router()

const getShapeAsMvtController = new GetShapeAsMvtController()

waterwayRoutes.get(
  '/tiles/:z/:x/:y.:format',
  checkTile,
  getShapeAsMvtController.handle
)
