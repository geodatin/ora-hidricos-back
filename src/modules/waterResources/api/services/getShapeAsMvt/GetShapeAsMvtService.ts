import { inject, injectable } from 'tsyringe'

import { IWaterwayRepositoryApi } from '../../repositories/IWatewayRepositoryApi'

interface IRequest {
  tile: { x: number; y: number; z: number; format: 'mvt' | 'pbf' }
}

@injectable()
export class GetShapeAsMvtService {
  constructor(
    @inject('WaterwayRepositoryApi')
    private waterwayRepositoryApi: IWaterwayRepositoryApi
  ) {}

  async execute({ tile }: IRequest) {
    const { mvt } = await this.waterwayRepositoryApi.getShapeAsMvt({
      tile,
    })
    return mvt
  }
}
