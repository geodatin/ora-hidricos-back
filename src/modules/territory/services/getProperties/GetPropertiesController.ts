import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { GetPropertiesService } from './GetPropertiesService'

export class GetPropertiesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { long, lat } = request.params
    const service = container.resolve(GetPropertiesService)
    const data = await service.execute({ long: Number(long), lat: Number(lat) })
    return response.json(data)
  }
}
