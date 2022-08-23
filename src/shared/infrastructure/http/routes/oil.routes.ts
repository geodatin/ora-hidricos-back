import { GetCompanyRankingController } from '@modules/oil/api/services/getCompanyRanking/GetCompanyRankingController'
import { GetOilFieldPointsController } from '@modules/oil/api/services/getOilFieldPoints/GetOilFieldPointsController'
import { GetTotalOilFieldController } from '@modules/oil/api/services/getTotalOilFiled/GetTotalOilFiledController'
import { Router } from 'express'

export const oilRoutes = Router()

const getOilFieldPointsController = new GetOilFieldPointsController()
const getTotalOilFieldController = new GetTotalOilFieldController()
const getCompanyRankingController = new GetCompanyRankingController()

oilRoutes.get('/field/points', getOilFieldPointsController.handle)
oilRoutes.get('/field/total', getTotalOilFieldController.handle)
oilRoutes.get('/field/ranking', getCompanyRankingController.handle)
