import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { GetShapeAsTilesService } from './GetShapeAsTilesService'

export class GetShapeAsTilesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const service = container.resolve(GetShapeAsTilesService)
    const data = await service.execute()
    return response.json(data)
  }
}
