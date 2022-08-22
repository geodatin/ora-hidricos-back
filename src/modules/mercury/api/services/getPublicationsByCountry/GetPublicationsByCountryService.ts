import { inject, injectable } from 'tsyringe'

import { IFishMercuryRepositoryApi } from '../../repositories/IFishMercuryRepositoryApi'
import { IHumanMercuryRepositoryApi } from '../../repositories/IHumanMercuryRepositoryApi'

interface IRequest {
  type: string
  countryCode?: number
}

@injectable()
export class GetPublicationsByCountryService {
  constructor(
    @inject('FishMercuryRepositoryApi')
    private fishMercuryRepositoryApi: IFishMercuryRepositoryApi,
    @inject('HumanMercuryRepositoryApi')
    private humanMercuryRepositoryApi: IHumanMercuryRepositoryApi
  ) {}

  async execute({ type, countryCode }: IRequest) {
    const repository = this.getRepository(type)
    const publicationsList = await repository.getPublicationsByCountry({
      countryCode,
    })
    return publicationsList
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
