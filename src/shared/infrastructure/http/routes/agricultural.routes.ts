import { GetAreaRankingController } from '@modules/agricultural/services/getAreaRanking /GetAreaRankingController'
import { GetPropertiesController } from '@modules/agricultural/services/getProperties/GetPropertiesController'
import { GetShapeAsTilesController } from '@modules/agricultural/services/getShapeAsTiles/GetShapeAsTilesController'
import { GetTotalController } from '@modules/agricultural/services/getTotal/GetTotalController'
import { Router } from 'express'

export const agriculturalRoutes = Router()

const getShapeAsTilesController = new GetShapeAsTilesController()
const getPropertiesController = new GetPropertiesController()
const getTotalController = new GetTotalController()
const getAreaRankingController = new GetAreaRankingController()

agriculturalRoutes.get('/tiles', getShapeAsTilesController.handle)
agriculturalRoutes.get(
  '/tiles/properties/:long/:lat',
  getPropertiesController.handle
)
agriculturalRoutes.get('/total', getTotalController.handle)
agriculturalRoutes.get('/ranking/area', getAreaRankingController.handle)
