import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { GetPointsService } from './GetPointsService'

export class GetPointsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { type } = request.params
    const getPointsService = container.resolve(GetPointsService)
    const points = await getPointsService.execute({ type })
    return response.json(points)
  }
}
