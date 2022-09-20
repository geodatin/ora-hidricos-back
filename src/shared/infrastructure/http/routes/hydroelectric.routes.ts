import { GetHydroelectricCountriesRankingController } from '@modules/waterResources/api/services/getHydroelectricCountriesRanking/GetHydroelectricCountriesRankingController'
import { GetHydroelectricPointsController } from '@modules/waterResources/api/services/getHydroelectricPoints/GetHydroelectricPointsController'
import { GetHydroelectricPotencyRankingController } from '@modules/waterResources/api/services/getHydroelectricPotencyRanking/GetHydroelectricPotencyRankingController'
import { GetTotalHydroelectricController } from '@modules/waterResources/api/services/getTotalHydroelctrics/GetTotalHydroelectricController'
import { Router } from 'express'

export const hydroelectricRoutes = Router()

const getHydroelectricPointsController = new GetHydroelectricPointsController()
const getTotalHydroelectricController = new GetTotalHydroelectricController()
const getHydroelectricCountriesRankingController =
  new GetHydroelectricCountriesRankingController()
const getHydroelectricPotencyRankingController =
  new GetHydroelectricPotencyRankingController()

hydroelectricRoutes.get('/points', getHydroelectricPointsController.handle)
hydroelectricRoutes.get('/total', getTotalHydroelectricController.handle)
hydroelectricRoutes.get(
  '/ranking/country',
  getHydroelectricCountriesRankingController.handle
)
hydroelectricRoutes.get(
  '/ranking/potency',
  getHydroelectricPotencyRankingController.handle
)
