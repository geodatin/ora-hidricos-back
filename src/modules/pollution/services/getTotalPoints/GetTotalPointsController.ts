import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { GetTotalPointsService } from './GetTotalPointsService'

export class GetTotalPointsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { countryCode } = request.query
    const service = container.resolve(GetTotalPointsService)
    const data = await service.execute({
      countryCode: countryCode ? Number(countryCode) : null,
    })
    return response.json(data)
  }
}
