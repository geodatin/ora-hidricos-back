import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { GetTimeSeriesService } from './GetTimeSeriesService'

export class GetTimeSeriesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { territoryType } = request.params
    const { code } = request.query
    const getTimeSeriesService = container.resolve(GetTimeSeriesService)
    const timeSeries = await getTimeSeriesService.execute({
      territoryType,
      code: code ? Number(code) : null,
    })

    return response.status(200).json(timeSeries)
  }
}
