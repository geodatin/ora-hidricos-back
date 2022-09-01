import { IWaterUserRepository } from '@modules/anaWaterUsers/repositories/IWaterUserRepository'
import { inject, injectable } from 'tsyringe'

interface IRequest {
  territoryType: string
}

@injectable()
export class GetTotalService {
  constructor(
    @inject('WaterUserStateRepository')
    private WaterUserStateRepository: IWaterUserRepository,
    @inject('WaterUserUnionRepository')
    private WaterUserUnionRepository: IWaterUserRepository
  ) {}

  async execute({ territoryType }: IRequest) {
    const repository = this.getRepository(territoryType)
    const count = await repository.getTotal()
    return { count }
  }

  private getRepository(territoryType: string): IWaterUserRepository {
    const repositories = {
      state: this.WaterUserStateRepository,
      union: this.WaterUserUnionRepository,
    }

    return repositories[territoryType]
  }
}
