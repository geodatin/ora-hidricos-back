import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { GetSituationMapService } from './GetSituationMapService'

export class GetSituationMapController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { countryCode } = request.query
    const service = container.resolve(GetSituationMapService)
    const data = await service.execute({
      countryCode: countryCode ? Number(countryCode) : null,
    })
    return response.json(data)
  }
}
