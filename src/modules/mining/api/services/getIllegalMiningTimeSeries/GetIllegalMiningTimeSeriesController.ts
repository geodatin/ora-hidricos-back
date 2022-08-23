import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { GetIllegalMiningTimeSeriesService } from './GetIllegalMiningTimeSeriesService'

export class GetIllegalMiningTimeSeriesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { countryCode } = request.query
    const service = container.resolve(GetIllegalMiningTimeSeriesService)
    const data = await service.execute({
      countryCode: countryCode ? Number(countryCode) : null,
    })
    return response.json(data)
  }
}
