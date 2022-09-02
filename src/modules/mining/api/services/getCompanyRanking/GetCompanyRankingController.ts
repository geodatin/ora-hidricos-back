import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { GetCompanyRankingService } from './GetCompanyRankingService'

export class GetSubstanceRankingController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { countryCode, page, pageSize } = request.query
    const service = container.resolve(GetCompanyRankingService)
    const data = await service.execute({
      countryCode: countryCode ? Number(countryCode) : null,
      page: page ? Number(page) : 1,
      pageSize: pageSize ? Number(pageSize) : 5,
    })
    return response.json(data)
  }
}
