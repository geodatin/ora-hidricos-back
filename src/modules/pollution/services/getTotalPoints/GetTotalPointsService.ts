import { inject, injectable } from 'tsyringe'

import { IOrganicPollutionRepository } from '../../repositories/IOrganicPollutionRepository'

interface IRequest {
  countryCode: number
}

@injectable()
export class GetTotalPointsService {
  constructor(
    @inject('OrganicPollutionRepository')
    private OrganicPollutionRepository: IOrganicPollutionRepository
  ) {}

  async execute({ countryCode }: IRequest) {
    const count = await this.OrganicPollutionRepository.getTotalPoints({
      countryCode,
    })
    return { count }
  }
}
