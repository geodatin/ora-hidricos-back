import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { GetShapeService } from './getShapeService'

export class GetShapeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { tile } = request
    const service = container.resolve(GetShapeService)
    const data = await service.execute({ tile })
    response.set('Content-type', 'application/vnd.mapbox-vector-tile')
    return response.send(data)
  }
}
