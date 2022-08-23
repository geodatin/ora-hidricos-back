import { inject, injectable } from 'tsyringe'

import { paginate, countPages } from '@shared/utils/paginate'

import { IOilFieldRepositoryApi } from '../../repositories/IOilFieldRepositoryApi'

interface IRequest {
  countryCode?: number
  page?: number
  pageSize?: number
}

@injectable()
export class GetCompanyRankingService {
  constructor(
    @inject('OilFieldRepositoryApi')
    private OilFieldRepositoryApi: IOilFieldRepositoryApi
  ) {}

  async execute({ countryCode, page, pageSize }: IRequest) {
    const ranking = await this.OilFieldRepositoryApi.getCompanyRanking({
      countryCode,
    })
    return this.formatRanking(ranking, page, pageSize)
  }

  formatRanking(
    ranking: {
      name: string
      amount: number
    }[],
    page: number,
    pageSize: number
  ) {
    const x = []
    const data = []
    const position = []

    for (const [index, record] of ranking.entries()) {
      x.push(record.name)
      data.push(record.amount)
      position.push(index + 1)
    }

    return {
      x: paginate(x, page, pageSize),
      series: [
        {
          id: 'data',
          data: paginate(data, page, pageSize),
        },
      ],
      position: paginate(position, page, pageSize),
      pages: countPages(x, pageSize),
    }
  }
}
