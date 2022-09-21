import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { GetTotalService } from './GetTotalService'

export class GetTotalController {
  async handle(request: Request, response: Response): Promise<Response> {
    const service = container.resolve(GetTotalService)
    const data = await service.execute()
    return response.json(data)
  }
}
