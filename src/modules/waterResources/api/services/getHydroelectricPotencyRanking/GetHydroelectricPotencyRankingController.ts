import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { GetHydroelectricPotencyRankingService } from './GetHydroelectricPotencyRankingService'

export class GetHydroelectricPotencyRankingController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { page, pageSize, countryCode } = request.query
    const service = container.resolve(GetHydroelectricPotencyRankingService)
    const data = await service.execute({
      countryCode: countryCode ? Number(countryCode) : null,
      page: page ? Number(page) : 1,
      pageSize: pageSize ? Number(pageSize) : 5,
    })
    return response.json(data)
  }
}
