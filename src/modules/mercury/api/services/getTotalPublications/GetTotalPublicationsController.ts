import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { GetTotalPublicationsService } from './GetTotalPublicationsService'

export class GetTotalPublicationsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { type } = request.params
    const { countryCode } = request.query
    const getTotalPublications = container.resolve(GetTotalPublicationsService)
    const count = await getTotalPublications.execute({
      type,
      countryCode: countryCode ? Number(countryCode) : null,
    })
    return response.json({ count })
  }
}
