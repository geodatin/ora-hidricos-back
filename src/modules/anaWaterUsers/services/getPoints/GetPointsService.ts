import { IWaterUserRepository } from '@modules/anaWaterUsers/repositories/IWaterUserRepository'
import { inject, injectable } from 'tsyringe'

import { toGeojson } from '@shared/utils/toGeojson'

interface IRequest {
  territoryType: string
}

@injectable()
export class GetPointsService {
  constructor(
    @inject('WaterUserStateRepository')
    private WaterUserStateRepository: IWaterUserRepository,
    @inject('WaterUserUnionRepository')
    private WaterUserUnionRepository: IWaterUserRepository
  ) {}

  async execute({ territoryType }: IRequest) {
    const repository = this.getRepository(territoryType)
    const data = await repository.getPoints()
    return toGeojson(data, 'geometry')
  }

  private getRepository(territoryType: string): IWaterUserRepository {
    const repositories = {
      state: this.WaterUserStateRepository,
      union: this.WaterUserUnionRepository,
    }

    return repositories[territoryType]
  }
}
