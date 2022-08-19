import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { GetPublicationsByCountryService } from './GetPublicationsByCountryService'

export class GetPublicationsByCountryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { type } = request.params
    const service = container.resolve(GetPublicationsByCountryService)
    const timeSeries = await service.execute({
      type,
    })
    return response.json(timeSeries)
  }
}
