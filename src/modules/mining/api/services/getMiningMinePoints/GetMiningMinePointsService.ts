import { inject, injectable } from 'tsyringe'

import { IMiningMineRepositoryApi } from '../../repositories/IMiningMineRepositoryApi'

interface IRequest {
  tile: {
    z: number
    x: number
    y: number
    format: 'mvt' | 'pbf'
  }
  countryCode?: number
}

@injectable()
export class GetMiningMinePointsService {
  constructor(
    @inject('MiningMineRepositoryApi')
    private miningMineRepositoryApi: IMiningMineRepositoryApi
  ) {}

  async execute({ tile, countryCode }: IRequest) {
    const { mvt } = await this.miningMineRepositoryApi.getPoints({
      tile,
      countryCode,
    })
    return mvt
  }
}
