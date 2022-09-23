import { GetAreaByCountryController } from '@modules/territory/services/getAreaByCountryCountry/GetAreaByCountryController'
import { GetCountryRankingController } from '@modules/territory/services/getCountryRanking/GetCountryRankingController'
import { GetPropertiesController } from '@modules/territory/services/getProperties/GetPropertiesController'
import { GetShapeController } from '@modules/territory/services/getShape/GetShapeController'
import { GetTerritoryNameController } from '@modules/territory/services/getTerritoryNames/GetTerritoryNameController'
import { GetTotalWatershedAreaController } from '@modules/territory/services/getTotalWatershedArea/GetTotalWatershedAreaController'
import { Router } from 'express'

export const territoryRoutes = Router()

const getTerritoryNameController = new GetTerritoryNameController()
const getTotalWatershedAreaController = new GetTotalWatershedAreaController()
const getAreaByCountryController = new GetAreaByCountryController()
const getCountryRankingController = new GetCountryRankingController()
const getShapeController = new GetShapeController()
const getPropertiesController = new GetPropertiesController()

territoryRoutes.get('/:name', getTerritoryNameController.handle)
territoryRoutes.get('/watershed/area', getTotalWatershedAreaController.handle)
territoryRoutes.get(
  '/watershed/area/country',
  getAreaByCountryController.handle
)
territoryRoutes.get(
  '/watershed/area/country/ranking',
  getCountryRankingController.handle
)
territoryRoutes.get('/watershed/tiles', getShapeController.handle)
territoryRoutes.get(
  '/watershed/tiles/properties/:long/:lat',
  getPropertiesController.handle
)
