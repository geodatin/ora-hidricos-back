import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { GetTotalOilFiledService } from './GetTotalOilFiledService'

export class GetTotalOilFieldController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { countryCode } = request.query
    const service = container.resolve(GetTotalOilFiledService)
    const count = await service.execute({
      countryCode: countryCode ? Number(countryCode) : null,
    })
    return response.json({ count })
  }
}
