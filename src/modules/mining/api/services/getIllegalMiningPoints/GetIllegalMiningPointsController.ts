import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { GetIllegalMiningPointsService } from './GetIllegalMiningPointsService.'

export class GetIllegalMiningPointsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { code } = request.query

    const getIllegalMiningPointsService = container.resolve(
      GetIllegalMiningPointsService
    )
    const points = await getIllegalMiningPointsService.execute({
      code: code ? String(code) : null,
    })
    return response.json(points)
  }
}
