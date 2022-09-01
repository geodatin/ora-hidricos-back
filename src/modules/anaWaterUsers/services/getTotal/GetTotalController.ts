import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { GetTotalService } from './GetTotalService'

export class GetTotalController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { territoryType } = request.params
    const service = container.resolve(GetTotalService)
    const data = await service.execute({ territoryType })
    return response.json(data)
  }
}
