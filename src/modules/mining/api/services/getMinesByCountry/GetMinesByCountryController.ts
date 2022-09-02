import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { GetMinesByCountryService } from './GetPublicationsByCountryService'

export class GetMinesByCountryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { countryCode } = request.query
    const service = container.resolve(GetMinesByCountryService)
    const timeSeries = await service.execute({
      countryCode: countryCode ? Number(countryCode) : null,
    })
    return response.json(timeSeries)
  }
}
