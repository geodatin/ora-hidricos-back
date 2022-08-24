import { inject, injectable } from 'tsyringe'

import { IOilFieldRepositoryApi } from '../../repositories/IOilFieldRepositoryApi'

interface IRequest {
  countryCode?: number
}

@injectable()
export class GetSituationAmountService {
  constructor(
    @inject('OilFieldRepositoryApi')
    private oilFieldRepositoryApi: IOilFieldRepositoryApi
  ) {}

  async execute({ countryCode }: IRequest) {
    const situationAmount = await this.oilFieldRepositoryApi.getSituationAmount(
      {
        countryCode,
      }
    )
    return situationAmount
  }
}
