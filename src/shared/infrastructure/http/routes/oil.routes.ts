import { GetOilFieldPointsController } from '@modules/oil/api/services/getOilFieldPoints/GetOilFieldPointsController'
import { Router } from 'express'

export const oilRoutes = Router()

const getOilFieldPointsController = new GetOilFieldPointsController()

oilRoutes.get('/field/points', getOilFieldPointsController.handle)
