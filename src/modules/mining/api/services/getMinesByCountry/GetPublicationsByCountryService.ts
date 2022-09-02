import { inject, injectable } from 'tsyringe'

import { IMiningMineRepositoryApi } from '../../repositories/IMiningMineRepositoryApi'

interface IRequest {
  countryCode?: number
}

@injectable()
export class GetMinesByCountryService {
  constructor(
    @inject('MiningMineRepositoryApi')
    private MiningMineRepository: IMiningMineRepositoryApi
  ) {}

  async execute({ countryCode }: IRequest) {
    const publicationsList = await this.MiningMineRepository.getMinesByCountry(
      countryCode
    )
    return publicationsList
  }
}
