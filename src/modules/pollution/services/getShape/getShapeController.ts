import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { GetShapeService } from './getShapeService'

export class GetShapeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const service = container.resolve(GetShapeService)
    const url = await service.execute()
    return response.json(url)
  }
}
