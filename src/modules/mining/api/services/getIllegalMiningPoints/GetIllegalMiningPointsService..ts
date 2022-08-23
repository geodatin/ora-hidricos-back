import { inject, injectable } from 'tsyringe'

import { AppError } from '@shared/errors/AppError'
import { toGeojson } from '@shared/utils/toGeojson'

import { IIllegalMiningRepositoryApi } from '../../repositories/IIllegalMiningRepositoryApi'

interface IRequest {
  code?: string
  countryCode?: number
}

@injectable()
export class GetIllegalMiningPointsService {
  constructor(
    @inject('IllegalMiningRepositoryApi')
    private illegalMiningRepositoryApi: IIllegalMiningRepositoryApi
  ) {}

  async execute({ code, countryCode }: IRequest) {
    const points = await this.illegalMiningRepositoryApi.getPoints({
      code,
      countryCode,
    })
    if (points.length === 0) {
      throw new AppError('Informed code does not exist')
    }
    return toGeojson(points, 'geometry')
  }
}
