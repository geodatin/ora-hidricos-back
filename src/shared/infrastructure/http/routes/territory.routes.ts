import { GetTerritoryNameController } from '@modules/territory/services/getTerritoryNamesService/GetTerritoryNameController'
import { Router } from 'express'

export const territoryRoutes = Router()

const getTerritoryNameController = new GetTerritoryNameController()

territoryRoutes.get('/:name', getTerritoryNameController.handle)
