import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { GetTerritoryNameService } from './GetTerritoryNameService'

export class GetTerritoryNameController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name } = request.params
    const { type } = request.query
    const getTerritoryNameService = container.resolve(GetTerritoryNameService)
    const territories = await getTerritoryNameService.execute({
      name,
      type: type ? String(type) : null,
    })
    return response.json(territories)
  }
}
