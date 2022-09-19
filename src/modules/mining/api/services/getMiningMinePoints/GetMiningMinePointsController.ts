import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { GetMiningMinePointsService } from './GetMiningMinePointsService'

export class GetMiningMinePointsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const service = container.resolve(GetMiningMinePointsService)
    const data = await service.execute()
    return response.send(data)
  }
}
