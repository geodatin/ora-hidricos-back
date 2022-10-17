import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { GetHydroelectricByStatusService } from './GetHydroelectricByStatusService'

export class GetHydroelectricByStatusController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { countryCode } = request.query
    const { type } = request.params
    const service = container.resolve(GetHydroelectricByStatusService)
    const data = await service.execute({
      countryCode: countryCode ? Number(countryCode) : null,
      type: type as 'UHE' | 'PCH',
    })
    return response.json(data)
  }
}
