import { GetBestowalRankingController } from '@modules/anaWaterUsers/services/getBestowalRanking/GetBestowalRankingController'
import { GetCitiesRankingController } from '@modules/anaWaterUsers/services/getCitiesRanking /GetCitiesRankingController'
import { GetGoalRankingController } from '@modules/anaWaterUsers/services/getGoalRanking /GetGoalRankingController'
import { GetInterferenceRankingController } from '@modules/anaWaterUsers/services/getInterferenceRanking/GetInterferenceRankingController'
import { GetPointsController } from '@modules/anaWaterUsers/services/getPoints/GetPointsController'
import { GetTotalController } from '@modules/anaWaterUsers/services/getTotal/GetTotalController'
import { Router } from 'express'

export const waterUsersRoutes = Router()

const getPointsController = new GetPointsController()
const getTotalController = new GetTotalController()
const getBestowalRankingController = new GetBestowalRankingController()
const getInterferenceRankingController = new GetInterferenceRankingController()
const getCitiesRankingController = new GetCitiesRankingController()
const getGoalRankingController = new GetGoalRankingController()

waterUsersRoutes.get('/:territoryType/points', getPointsController.handle)
waterUsersRoutes.get('/:territoryType/total', getTotalController.handle)
waterUsersRoutes.get(
  '/ranking/bestowal/:territoryType/:rankingVariation',
  getBestowalRankingController.handle
)
waterUsersRoutes.get(
  '/ranking/interference/:territoryType',
  getInterferenceRankingController.handle
)
waterUsersRoutes.get(
  '/ranking/cities/:territoryType',
  getCitiesRankingController.handle
)
waterUsersRoutes.get(
  '/ranking/goal/:territoryType',
  getGoalRankingController.handle
)
