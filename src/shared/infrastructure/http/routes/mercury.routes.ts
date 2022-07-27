import { GetPointsController } from '@modules/mercury/api/services/getPoints/GetPointsController'
import { Router } from 'express'

export const mercuryRoutes = Router()

const getPointsController = new GetPointsController()

mercuryRoutes.get('/:type/points', getPointsController.handle)
