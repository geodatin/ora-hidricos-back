import { inject, injectable } from 'tsyringe'

import { IMiningMineRepositoryApi } from '../../repositories/IMiningMineRepositoryApi'

interface IRequest {
  countryCode: number
}

@injectable()
export class GetTotalMiningMineOccurrencesService {
  constructor(
    @inject('MiningMineRepositoryApi')
    private MiningMineRepository: IMiningMineRepositoryApi
  ) {}

  async execute({ countryCode }: IRequest) {
    const count = await this.MiningMineRepository.getTotalMineOccurrences(
      countryCode
    )
    return count
  }
}
