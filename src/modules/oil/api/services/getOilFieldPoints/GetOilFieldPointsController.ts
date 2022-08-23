import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { GetOilFieldPointsService } from './GetOilFieldPointsService'

export class GetOilFieldPointsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { code, countryCode } = request.query
    const service = container.resolve(GetOilFieldPointsService)
    const data = await service.execute({
      code: code ? String(code) : null,
      countryCode: countryCode ? Number(countryCode) : null,
    })
    return response.json(data)
  }
}
