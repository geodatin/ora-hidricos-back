import { inject, injectable } from 'tsyringe'

import { toGeojson } from '@shared/utils/toGeojson'

import { IHydroelectricRepository } from '../../repositories/IHydroelectricRepository'

interface IRequest {
  countryCode?: number
}

@injectable()
export class GetHydroelectricPointsService {
  constructor(
    @inject('HydroelectricRepository')
    private HydroelectricRepository: IHydroelectricRepository
  ) {}

  async execute({ countryCode }: IRequest) {
    const points = await this.HydroelectricRepository.getPoints(countryCode)
    const parsed = toGeojson(points)
    return parsed
  }
}
