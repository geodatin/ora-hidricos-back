import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { GetShapeAsMvtService } from './GetShapeAsMvtService'

export class GetShapeAsMvtController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { tile } = request
    const service = container.resolve(GetShapeAsMvtService)
    const data = await service.execute({ tile })
    response.set('Content-type', 'application/vnd.mapbox-vector-tile')
    return response.send(data)
  }
}
