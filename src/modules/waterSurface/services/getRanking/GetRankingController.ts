import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { GetRankingService } from './GetRankingService'

export class GetRankingController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { territoryType, rankingType } = request.params
    const { page, pageSize, code } = request.query
    const getRankingService = container.resolve(GetRankingService)
    const defaultPage = 1
    const defaultPageSize = 5
    const ranking = await getRankingService.execute({
      territoryType,
      rankingType,
      page: page ? Number(page) : defaultPage,
      pageSize: pageSize ? Number(pageSize) : defaultPageSize,
      code: code ? Number(code) : null,
    })

    return response.status(200).json(ranking)
  }
}
