import { GetPropertiesController } from '@modules/population/services/getProperties/GetPropertiesController'
import { GetShapeController } from '@modules/population/services/getShape/GetShapeController'
import { GetTotalController } from '@modules/population/services/getTotal/GetTotalController'
import { GetWatershedRankingController } from '@modules/population/services/getWatershedRanking /GetWatershedRankingController'
import { Router } from 'express'

export const populationRoutes = Router()

const getShapeController = new GetShapeController()
const getTotalController = new GetTotalController()
const getWatershedRankingController = new GetWatershedRankingController()
const getPropertiesController = new GetPropertiesController()

populationRoutes.get('/tiles', getShapeController.handle)
populationRoutes.get(
  '/tiles/properties/:long/:lat',
  getPropertiesController.handle
)
populationRoutes.get('/total', getTotalController.handle)
populationRoutes.get('/ranking', getWatershedRankingController.handle)
