import { IOrganicPollutionRepository } from '@modules/pollution/repositories/IOrganicPollutionRepository'
import { inject, injectable } from 'tsyringe'

interface IRequest {
  countryCode: number
}

@injectable()
export class GetSituationMapService {
  constructor(
    @inject('OrganicPollutionRepository')
    private OrganicPollutionRepository: IOrganicPollutionRepository
  ) {}

  async execute({ countryCode }: IRequest) {
    const response = await this.OrganicPollutionRepository.getSituationMap({
      countryCode,
    })
    return response
  }
}
