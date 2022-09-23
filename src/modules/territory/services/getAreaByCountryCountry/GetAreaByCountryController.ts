import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { GetAreaByCountryService } from './GetAreaByCountryService'

export class GetAreaByCountryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const service = container.resolve(GetAreaByCountryService)
    const timeSeries = await service.execute()
    return response.json(timeSeries)
  }
}
