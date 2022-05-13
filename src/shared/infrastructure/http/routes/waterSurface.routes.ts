import { GetRankingController } from '@modules/waterSurface/services/getRanking/GetRankingController'
import { GetStatisticsController } from '@modules/waterSurface/services/getStatistics/GetStatisticsController'
import { GetTimeSeriesController } from '@modules/waterSurface/services/getTimeSeries/GetTimeSeriesController'
import { Router } from 'express'

export const waterSurfaceRoutes = Router()

const getStatisticsController = new GetStatisticsController()
const getTimeSeriesController = new GetTimeSeriesController()
const getRankingController = new GetRankingController()

waterSurfaceRoutes.get(
  '/statistics/:territoryType',
  getStatisticsController.handle
)

waterSurfaceRoutes.get(
  '/timeSeries/:territoryType',
  getTimeSeriesController.handle
)

waterSurfaceRoutes.get(
  '/ranking/:territoryType/:rankingType',
  getRankingController.handle
)
