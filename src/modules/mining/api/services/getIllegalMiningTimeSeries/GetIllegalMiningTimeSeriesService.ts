import { inject, injectable } from 'tsyringe'

import { IIllegalMiningRepositoryApi } from '../../repositories/IIllegalMiningRepositoryApi'

interface IRequest {
  countryCode: number
}

@injectable()
export class GetIllegalMiningTimeSeriesService {
  constructor(
    @inject('IllegalMiningRepositoryApi')
    private illegalMiningRepositoryApi: IIllegalMiningRepositoryApi
  ) {}

  async execute({ countryCode }: IRequest) {
    const timeSeries = await this.illegalMiningRepositoryApi.getTimeSeries({
      countryCode,
    })
    const formattedTimeSeries = {
      x: [],
      y: [],
    }

    timeSeries.forEach((record) => {
      formattedTimeSeries.x.push(record.x)
      formattedTimeSeries.y.push(record.y)
    })
    return formattedTimeSeries
  }
}
