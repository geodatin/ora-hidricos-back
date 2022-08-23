import { inject, injectable } from 'tsyringe'

import { IIllegalMiningRepositoryApi } from '../../repositories/IIllegalMiningRepositoryApi'

interface IRequest {
  countryCode: number
}

@injectable()
export class GetTotalIllegalMiningOccurrencesService {
  constructor(
    @inject('IllegalMiningRepositoryApi')
    private illegalMiningRepository: IIllegalMiningRepositoryApi
  ) {}

  async execute({ countryCode }: IRequest) {
    const count = await this.illegalMiningRepository.getTotalOccurrences({
      countryCode,
    })
    return count
  }
}
