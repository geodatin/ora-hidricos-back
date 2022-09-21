import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { GetShapeService } from './GetShapeService'

export class GetShapeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const getPointsService = container.resolve(GetShapeService)
    const points = await getPointsService.execute()
    return response.json(points)
  }
}
