import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { GetAreaRankingService } from './GetAreaRankingService'

export class GetAreaRankingController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { page, pageSize } = request.query
    const service = container.resolve(GetAreaRankingService)
    const data = await service.execute({
      page: page ? Number(page) : 1,
      pageSize: pageSize ? Number(pageSize) : 5,
    })
    return response.json(data)
  }
}
