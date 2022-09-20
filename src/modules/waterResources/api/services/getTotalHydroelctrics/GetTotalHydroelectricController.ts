import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { GetTotalHydroelectricService } from './GetTotalHydroelectricService'

export class GetTotalHydroelectricController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { countryCode } = request.query
    const service = container.resolve(GetTotalHydroelectricService)
    const data = await service.execute({
      countryCode: countryCode ? Number(countryCode) : null,
    })
    return response.json(data)
  }
}
