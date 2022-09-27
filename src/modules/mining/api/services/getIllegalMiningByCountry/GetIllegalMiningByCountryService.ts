import { inject, injectable } from 'tsyringe'

import { IIllegalMiningRepositoryApi } from '../../repositories/IIllegalMiningRepositoryApi'

interface IRequest {
  countryCode?: number
}

@injectable()
export class GetIllegalMiningByCountryService {
  constructor(
    @inject('IllegalMiningRepositoryApi')
    private illegalMiningRepository: IIllegalMiningRepositoryApi
  ) {}

  async execute({ countryCode }: IRequest) {
    const publicationsList =
      await this.illegalMiningRepository.getIllegalMiningByCountry(countryCode)
    return publicationsList
  }
}
