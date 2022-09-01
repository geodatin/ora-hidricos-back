import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { GetInterferenceRankingService } from './GetInterferenceRankingService'

export class GetInterferenceRankingController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { territoryType } = request.params
    const { page, pageSize } = request.query
    const service = container.resolve(GetInterferenceRankingService)
    const data = await service.execute({
      territoryType,
      page: page ? Number(page) : 1,
      pageSize: pageSize ? Number(pageSize) : 5,
    })
    return response.json(data)
  }
}
