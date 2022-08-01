import { GetIllegalMiningPointsController } from '@modules/mining/api/services/getIllegalMiningPoints/GetIllegalMiningPointsController'
import { Router } from 'express'

export const miningRoutes = Router()

const getIllegalMiningPointsController = new GetIllegalMiningPointsController()

miningRoutes.get('/illegal/points', getIllegalMiningPointsController.handle)
