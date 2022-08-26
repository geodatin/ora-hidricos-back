import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { GetMiningMinePointsService } from './GetMiningMinePointsService'

export class GetMiningMinePointsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { countryCode } = request.query
    const { tile } = request
    const service = container.resolve(GetMiningMinePointsService)
    const data = await service.execute({
      tile,
      countryCode: countryCode ? Number(countryCode) : null,
    })
    return response.send(data)
  }
}
