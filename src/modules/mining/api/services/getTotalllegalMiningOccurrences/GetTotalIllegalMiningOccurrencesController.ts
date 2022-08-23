import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { GetTotalIllegalMiningOccurrencesService } from './GetTotalIllegalMiningOccurrencesService'

export class GetTotalIllegalMiningOccurrencesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { countryCode } = request.query
    const service = container.resolve(GetTotalIllegalMiningOccurrencesService)
    const count = await service.execute({
      countryCode: countryCode ? Number(countryCode) : null,
    })
    return response.json({ count })
  }
}
