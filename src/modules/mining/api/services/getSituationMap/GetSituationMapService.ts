import { inject, injectable } from 'tsyringe'

import { IMiningMineRepositoryApi } from '../../repositories/IMiningMineRepositoryApi'

interface IRequest {
  countryCode: number
}

@injectable()
export class GetSituationMapService {
  constructor(
    @inject('MiningMineRepositoryApi')
    private MiningMineRepository: IMiningMineRepositoryApi
  ) {}

  async execute({ countryCode }: IRequest) {
    const response = await this.MiningMineRepository.getSituationMap(
      countryCode
    )
    return response
  }
}
