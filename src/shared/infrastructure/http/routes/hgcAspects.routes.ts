import { GetAspectsRankingController } from '@modules/hgcAspects/services/getAspectsRanking/GetAspectsRankingController'
import { GetDomainRankingController } from '@modules/hgcAspects/services/getDomainRanking/GetDomainRankingController'
import { GetShapeController } from '@modules/hgcAspects/services/getShape/GetShapeController'
import { GetTotalController } from '@modules/hgcAspects/services/getTotal/GetTotalController'
import { Router } from 'express'

export const hgcAspectsRoutes = Router()

const getShapeController = new GetShapeController()
const getTotalController = new GetTotalController()
const getDomainRankingController = new GetDomainRankingController()
const getAspectsRankingController = new GetAspectsRankingController()

hgcAspectsRoutes.get('/shape', getShapeController.handle)
hgcAspectsRoutes.get('/total', getTotalController.handle)
hgcAspectsRoutes.get('/ranking/domain', getDomainRankingController.handle)
hgcAspectsRoutes.get('/ranking/aspects', getAspectsRankingController.handle)
