import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { GetTotalWatershedAreaService } from './GetTotalWatershedAreaService'

export class GetTotalWatershedAreaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const service = container.resolve(GetTotalWatershedAreaService)
    const territories = await service.execute()
    return response.json(territories)
  }
}
