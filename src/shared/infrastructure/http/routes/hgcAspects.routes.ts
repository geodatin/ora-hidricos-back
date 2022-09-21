import { GetShapeController } from '@modules/hgcAspects/services/getShape/GetShapeController'
import { GetTotalController } from '@modules/hgcAspects/services/getTotal/GetTotalController'
import { Router } from 'express'

export const hgcAspectsRoutes = Router()

const getShapeController = new GetShapeController()
const getTotalController = new GetTotalController()

hgcAspectsRoutes.get('/shape', getShapeController.handle)
hgcAspectsRoutes.get('/total', getTotalController.handle)
