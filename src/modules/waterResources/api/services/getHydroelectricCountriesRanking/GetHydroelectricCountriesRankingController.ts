import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { GetHydroelectricCountriesRankingService } from './GetHydroelectricCountriesRankingService'

export class GetHydroelectricCountriesRankingController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { page, pageSize, countryCode } = request.query
    const service = container.resolve(GetHydroelectricCountriesRankingService)
    const data = await service.execute({
      countryCode: countryCode ? Number(countryCode) : null,
      page: page ? Number(page) : 1,
      pageSize: pageSize ? Number(pageSize) : 5,
    })
    return response.json(data)
  }
}
