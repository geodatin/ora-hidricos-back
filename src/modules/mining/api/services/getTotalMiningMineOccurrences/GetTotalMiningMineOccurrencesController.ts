import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { GetTotalMiningMineOccurrencesService } from './GetTotalMiningMineOccurrencesService'

export class GetTotalMiningMineOccurrencesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { countryCode } = request.query
    const service = container.resolve(GetTotalMiningMineOccurrencesService)
    const count = await service.execute({
      countryCode: countryCode ? Number(countryCode) : null,
    })
    return response.json({ count })
  }
}
