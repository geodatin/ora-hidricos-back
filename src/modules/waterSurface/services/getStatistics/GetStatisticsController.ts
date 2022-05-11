import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { GetStatisticsService } from './GetStatisticsService'

export class GetStatisticsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { territoryType } = request.params
    const { code } = request.query
    const getStatisticsService = container.resolve(GetStatisticsService)
    const statistics = await getStatisticsService.execute({
      territoryType,
      code: code ? Number(code) : null,
    })

    return response.status(200).json(statistics)
  }
}
