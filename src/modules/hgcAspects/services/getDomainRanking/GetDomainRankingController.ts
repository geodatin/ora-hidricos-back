import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { GetDomainRankingService } from './GetDomainRankingService'

export class GetDomainRankingController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { page, pageSize } = request.query
    const service = container.resolve(GetDomainRankingService)
    const data = await service.execute({
      page: page ? Number(page) : 1,
      pageSize: pageSize ? Number(pageSize) : 5,
    })
    return response.json(data)
  }
}
