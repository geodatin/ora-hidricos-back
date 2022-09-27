import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { GetIllegalMiningByCountryService } from './GetIllegalMiningByCountryService'

export class GetIllegalMiningByCountryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { countryCode } = request.query
    const service = container.resolve(GetIllegalMiningByCountryService)
    const timeSeries = await service.execute({
      countryCode: countryCode ? Number(countryCode) : null,
    })
    return response.json(timeSeries)
  }
}
