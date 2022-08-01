import { inject, injectable } from 'tsyringe'

import { AppError } from '@shared/errors/AppError'
import { toGeojson } from '@shared/utils/toGeojson'

import { IOilFieldRepositoryApi } from '../../repositories/IOilFieldRepositoryApi'

interface IRequest {
  code: string
}

@injectable()
export class GetOilFieldPointsService {
  constructor(
    @inject('OilFieldRepositoryApi')
    private oilFieldsRepositoryApi: IOilFieldRepositoryApi
  ) {}

  async execute({ code }: IRequest) {
    const points = await this.oilFieldsRepositoryApi.getPoints({ code })
    if (points.length === 0) {
      throw new AppError('Informed code does not exist')
    }
    return toGeojson(points, 'geometry')
  }
}
