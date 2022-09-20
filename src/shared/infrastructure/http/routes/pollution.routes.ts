import { GetPropertiesController } from '@modules/pollution/services/getProperties/GetPropertiesController'
import { GetShapeController } from '@modules/pollution/services/getShape/getShapeController'
import { GetSituationMapController } from '@modules/pollution/services/getSituationMap/GetSituationMapController'
import { GetTotalPointsController } from '@modules/pollution/services/getTotalPoints/GetTotalPointsController'
import { Router } from 'express'

export const pollutionRoutes = Router()

const getShapeController = new GetShapeController()
const getPropertiesController = new GetPropertiesController()
const getTotalPointsController = new GetTotalPointsController()
const getSituationMapController = new GetSituationMapController()

pollutionRoutes.get('/total', getTotalPointsController.handle)
pollutionRoutes.get('/situation', getSituationMapController.handle)
pollutionRoutes.get('/tiles', getShapeController.handle)
pollutionRoutes.get(
  '/tiles/properties/:long/:lat',
  getPropertiesController.handle
)
