import { GetPointsController } from '@modules/mercury/api/services/getPoints/GetPointsController'
import { GetPublicationsByCountryController } from '@modules/mercury/api/services/getPublicationsByCountry/GetPublicationsByCountryController'
import { GetPublicationsTimeSeriesController } from '@modules/mercury/api/services/getPublicationsTimeSeries/GetPublicationsTimeSeriesController'
import { GetTotalPublicationsController } from '@modules/mercury/api/services/getTotalPublications/GetTotalPublicationsController'
import { Router } from 'express'

export const mercuryRoutes = Router()

const getPointsController = new GetPointsController()
const getTotalPublicationsController = new GetTotalPublicationsController()
const getPublicationsTimeSeriesController =
  new GetPublicationsTimeSeriesController()
const getPublicationsByCountryController =
  new GetPublicationsByCountryController()

mercuryRoutes.get('/:type/points', getPointsController.handle)
mercuryRoutes.get(
  '/:type/publications/total',
  getTotalPublicationsController.handle
)
mercuryRoutes.get(
  '/:type/publications/time-series',
  getPublicationsTimeSeriesController.handle
)
mercuryRoutes.get(
  '/:type/publications/countries',
  getPublicationsByCountryController.handle
)
