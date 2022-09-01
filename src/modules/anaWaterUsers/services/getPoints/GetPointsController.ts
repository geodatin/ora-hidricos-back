import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { GetPointsService } from './GetPointsService'

export class GetPointsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { territoryType } = request.params
    const service = container.resolve(GetPointsService)
    const data = await service.execute({ territoryType })
    return response.json(data)
  }
}
