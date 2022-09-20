import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { GetHydroelectricPointsService } from './GetHydroelectricPointsService'

export class GetHydroelectricPointsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { countryCode } = request.query
    const getPointsService = container.resolve(GetHydroelectricPointsService)
    const points = await getPointsService.execute({
      countryCode: countryCode ? Number(countryCode) : null,
    })
    return response.json(points)
  }
}
