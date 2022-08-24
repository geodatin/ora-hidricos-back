import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { GetSituationAmountService } from './GetSituationAmountService'

export class GetSituationAmountController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { countryCode } = request.query
    const service = container.resolve(GetSituationAmountService)
    const data = await service.execute({
      countryCode: countryCode ? Number(countryCode) : null,
    })
    return response.json(data)
  }
}
