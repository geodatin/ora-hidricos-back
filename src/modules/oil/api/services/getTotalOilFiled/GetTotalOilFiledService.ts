import { inject, injectable } from 'tsyringe'

import { IOilFieldRepositoryApi } from '../../repositories/IOilFieldRepositoryApi'

interface IRequest {
  countryCode: number
}

@injectable()
export class GetTotalOilFiledService {
  constructor(
    @inject('OilFieldRepositoryApi')
    private oilFieldRepositoryApi: IOilFieldRepositoryApi
  ) {}

  async execute({ countryCode }: IRequest) {
    const count = await this.oilFieldRepositoryApi.getTotal({
      countryCode,
    })
    return count
  }
}
