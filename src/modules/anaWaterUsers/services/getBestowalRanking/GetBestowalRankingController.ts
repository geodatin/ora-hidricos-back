import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { GetBestowalRankingService } from './GetBestowalRankingService'

export class GetBestowalRankingController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { territoryType, rankingVariation } = request.params
    const { page, pageSize } = request.query
    const service = container.resolve(GetBestowalRankingService)
    const data = await service.execute({
      territoryType,
      page: page ? Number(page) : 1,
      pageSize: pageSize ? Number(pageSize) : 5,
      rankingVariation: rankingVariation as 'type' | 'situation',
    })
    return response.json(data)
  }
}
