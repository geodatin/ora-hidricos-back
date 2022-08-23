import { GetIllegalMiningPointsController } from '@modules/mining/api/services/getIllegalMiningPoints/GetIllegalMiningPointsController'
import { GetIllegalMiningTimeSeriesController } from '@modules/mining/api/services/getIllegalMiningTimeSeries/GetIllegalMiningTimeSeriesController'
import { GetSubstanceRankingController } from '@modules/mining/api/services/getSubstanceRanking/GetSubstanceRankingController'
import { GetTotalIllegalMiningOccurrencesController } from '@modules/mining/api/services/getTotalllegalMiningOccurrences/GetTotalIllegalMiningOccurrencesController'
import { Router } from 'express'

export const miningRoutes = Router()

const getIllegalMiningPointsController = new GetIllegalMiningPointsController()
const getTotalIllegalMiningOccurrencesController =
  new GetTotalIllegalMiningOccurrencesController()
const getIllegalMiningTimeSeriesController =
  new GetIllegalMiningTimeSeriesController()

const getSubstanceRankingController = new GetSubstanceRankingController()

miningRoutes.get('/illegal/points', getIllegalMiningPointsController.handle)
miningRoutes.get(
  '/illegal/total/occurrences',
  getTotalIllegalMiningOccurrencesController.handle
)
miningRoutes.get(
  '/illegal/time-series',
  getIllegalMiningTimeSeriesController.handle
)

miningRoutes.get('/illegal/ranking', getSubstanceRankingController.handle)
