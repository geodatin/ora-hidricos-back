import { GetCompanyRankingController } from '@modules/oil/api/services/getCompanyRanking/GetCompanyRankingController'
import { GetOilFieldPointsController } from '@modules/oil/api/services/getOilFieldPoints/GetOilFieldPointsController'
import { GetPropertiesController } from '@modules/oil/api/services/getProperties/GetPropertiesController'
import { GetShapeAsTilesController } from '@modules/oil/api/services/getShapeAsTiles/GetShapeAsTilesController'
import { GetSituationAmountController } from '@modules/oil/api/services/getSituationAmount/GetSituationAmountController'
import { GetTotalOilFieldController } from '@modules/oil/api/services/getTotalOilFiled/GetTotalOilFiledController'
import { Router } from 'express'

export const oilRoutes = Router()

const getOilFieldPointsController = new GetOilFieldPointsController()
const getTotalOilFieldController = new GetTotalOilFieldController()
const getCompanyRankingController = new GetCompanyRankingController()
const getSituationAmountController = new GetSituationAmountController()
const getShapeAsTilesController = new GetShapeAsTilesController()
const getPropertiesController = new GetPropertiesController()

oilRoutes.get('/field/points', getOilFieldPointsController.handle)
oilRoutes.get('/field/total', getTotalOilFieldController.handle)
oilRoutes.get('/field/ranking', getCompanyRankingController.handle)
oilRoutes.get('/field/situation', getSituationAmountController.handle)
oilRoutes.get('/field/tiles', getShapeAsTilesController.handle)
oilRoutes.get(
  '/field/tiles/properties/:long/:lat',
  getPropertiesController.handle
)
