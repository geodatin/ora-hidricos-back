import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { GetPointsService } from './GetPointsService'

export class GetPointsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { type } = request.params
    const { countryCode } = request.query
    const getPointsService = container.resolve(GetPointsService)
    const points = await getPointsService.execute({
      type,
      countryCode: countryCode ? Number(countryCode) : null,
    })
    return response.json(points)
  }
}
