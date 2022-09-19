import { GetAreaRankingController } from '@modules/soil/api/services/getAreaRanking /GetAreaRankingController'
import { GetPropertiesController } from '@modules/soil/api/services/getProperties/GetPropertiesController'
import { GetShapeAsTilesController } from '@modules/soil/api/services/getShapeAsTiles/GetShapeAsTilesController'
import { GetTotalController } from '@modules/soil/api/services/getTotal/GetTotalController'
import { Router } from 'express'

export const floodRoutes = Router()

const getShapeAsTilesController = new GetShapeAsTilesController()
const getPropertiesController = new GetPropertiesController()
const getTotalController = new GetTotalController()
const getAreaRankingController = new GetAreaRankingController()

floodRoutes.get('/tiles', getShapeAsTilesController.handle)
floodRoutes.get('/tiles/properties/:long/:lat', getPropertiesController.handle)
floodRoutes.get('/total', getTotalController.handle)
floodRoutes.get('/ranking/area', getAreaRankingController.handle)
