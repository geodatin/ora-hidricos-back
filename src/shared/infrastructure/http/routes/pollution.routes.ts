import { GetShapeController } from '@modules/pollution/services/getShape/getShapeController'
import { GetSituationMapController } from '@modules/pollution/services/getSituationMap/GetSituationMapController'
import { GetTotalPointsController } from '@modules/pollution/services/getTotalPoints/GetTotalPointsController'
import { Router } from 'express'

import { checkTile } from '../middlewares/checkTile'

export const pollutionRoutes = Router()

const getShapeController = new GetShapeController()
const getTotalPointsController = new GetTotalPointsController()
const getSituationMapController = new GetSituationMapController()

pollutionRoutes.get(
  '/tiles/:z/:x/:y.:format',
  checkTile,
  getShapeController.handle
)
pollutionRoutes.get('/total', getTotalPointsController.handle)
pollutionRoutes.get('/situation', getSituationMapController.handle)
