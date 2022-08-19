import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { GetPublicationsTimeSeriesService } from './GetPublicationsTimeSeriesService'

export class GetPublicationsTimeSeriesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { type } = request.params
    const { countryCode } = request.query
    const service = container.resolve(GetPublicationsTimeSeriesService)
    const timeSeries = await service.execute({
      type,
      countryCode: countryCode ? Number(countryCode) : null,
    })
    return response.json(timeSeries)
  }
}
