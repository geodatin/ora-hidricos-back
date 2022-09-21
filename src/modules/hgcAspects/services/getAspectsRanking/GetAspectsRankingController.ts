import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { GetAspectsRankingService } from './GetAspectsRankingService'

export class GetAspectsRankingController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { page, pageSize } = request.query
    const service = container.resolve(GetAspectsRankingService)
    const data = await service.execute({
      page: page ? Number(page) : 1,
      pageSize: pageSize ? Number(pageSize) : 5,
    })
    return response.json(data)
  }
}
