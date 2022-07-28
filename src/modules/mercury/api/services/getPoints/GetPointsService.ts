import { inject, injectable } from 'tsyringe'

import { IFishMercuryRepositoryApi } from '../../repositories/IFishMercuryRepositoryApi'
import { IHumanMercuryRepositoryApi } from '../../repositories/IHumanMercuryRepositoryApi'

const geojson: any = require('geojson')

interface IRequest {
  type: string
}

@injectable()
export class GetPointsService {
  constructor(
    @inject('FishMercuryRepositoryApi')
    private fishMercuryRepositoryApi: IFishMercuryRepositoryApi,
    @inject('HumanMercuryRepositoryApi')
    private humanMercuryRepositoryApi: IHumanMercuryRepositoryApi
  ) {}

  async execute({ type }: IRequest) {
    const repository = this.getRepository(type)
    const points = await repository.getPoints()
    const parsed = geojson.parse(points, { GeoJSON: 'location' })
    return parsed
  }

  private getRepository(
    type: string
  ): IFishMercuryRepositoryApi | IHumanMercuryRepositoryApi {
    const repositories = {
      human: this.humanMercuryRepositoryApi,
      fish: this.fishMercuryRepositoryApi,
    }

    return repositories[type]
  }
}
