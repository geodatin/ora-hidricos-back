import { GetIllegalMiningPointsController } from '@modules/mining/api/services/getIllegalMiningPoints/GetIllegalMiningPointsController'
import { GetIllegalMiningTimeSeriesController } from '@modules/mining/api/services/getIllegalMiningTimeSeries/GetIllegalMiningTimeSeriesController'
import { GetMinesByCountryController } from '@modules/mining/api/services/getMinesByCountry/GetMinesByCountryController'
import { GetMiningMinePointsController } from '@modules/mining/api/services/getMiningMinePoints/GetMiningMinePointsController'
import { GetPropertiesController } from '@modules/mining/api/services/getProperties/GetPropertiesController'
import { GetSituationMapController } from '@modules/mining/api/services/getSituationMap/GetSituationMapController'
import { GetSubstanceRankingController } from '@modules/mining/api/services/getSubstanceRanking/GetSubstanceRankingController'
import { GetTotalIllegalMiningOccurrencesController } from '@modules/mining/api/services/getTotalllegalMiningOccurrences/GetTotalIllegalMiningOccurrencesController'
import { GetTotalMiningMineOccurrencesController } from '@modules/mining/api/services/getTotalMiningMineOccurrences/GetTotalMiningMineOccurrencesController'
import { GetCompanyRankingController } from '@modules/oil/api/services/getCompanyRanking/GetCompanyRankingController'
import { Router } from 'express'

export const miningRoutes = Router()

const getIllegalMiningPointsController = new GetIllegalMiningPointsController()
const getTotalIllegalMiningOccurrencesController =
  new GetTotalIllegalMiningOccurrencesController()
const getIllegalMiningTimeSeriesController =
  new GetIllegalMiningTimeSeriesController()
const getSubstanceRankingController = new GetSubstanceRankingController()

const getMiningMinePointsController = new GetMiningMinePointsController()
const getTotalMiningMineOccurrencesController =
  new GetTotalMiningMineOccurrencesController()
const getCompanyRankingController = new GetCompanyRankingController()
const getMinesByCountryController = new GetMinesByCountryController()
const getSituationMapController = new GetSituationMapController()
const getPropertiesController = new GetPropertiesController()

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

miningRoutes.get('/mine/tiles', getMiningMinePointsController.handle)
miningRoutes.get(
  '/mine/tiles/properties/:long/:lat',
  getPropertiesController.handle
)
miningRoutes.get(
  '/mine/total/occurrences',
  getTotalMiningMineOccurrencesController.handle
)
miningRoutes.get('/mine/company/ranking', getCompanyRankingController.handle)
miningRoutes.get('/mine/countries', getMinesByCountryController.handle)
miningRoutes.get('/mine/situation', getSituationMapController.handle)
