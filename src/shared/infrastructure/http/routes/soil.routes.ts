import { GetSituationMapController } from '@modules/pollution/services/getSituationMap/GetSituationMapController'
import { GetTotalPointsController } from '@modules/pollution/services/getTotalPoints/GetTotalPointsController'
import { Router } from 'express'

export const soilRoutes = Router()

const getTotalPointsController = new GetTotalPointsController()
const getSituationMapController = new GetSituationMapController()

soilRoutes.get('/points/total', getTotalPointsController.handle)
soilRoutes.get('/situation/map', getSituationMapController.handle)
