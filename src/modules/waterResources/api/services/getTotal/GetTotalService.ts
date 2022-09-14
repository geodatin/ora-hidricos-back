import { inject, injectable } from 'tsyringe'

import { IWaterwayRepositoryApi } from '../../repositories/IWatewayRepositoryApi'

@injectable()
export class GetTotalService {
  constructor(
    @inject('WaterwayRepositoryApi')
    private waterwayRepositoryApi: IWaterwayRepositoryApi
  ) {}

  async execute() {
    const count = await this.waterwayRepositoryApi.getTotal()
    return { count }
  }
}
