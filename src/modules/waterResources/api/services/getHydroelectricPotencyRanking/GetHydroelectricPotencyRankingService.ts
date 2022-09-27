import { inject, injectable } from 'tsyringe'

import { countPages, paginate } from '@shared/utils/paginate'

import { IHydroelectricRepository } from '../../repositories/IHydroelectricRepository'

interface IRequest {
  countryCode?: number
  page: number
  pageSize: number
}

@injectable()
export class GetHydroelectricPotencyRankingService {
  constructor(
    @inject('HydroelectricRepository')
    private HydroelectricRepository: IHydroelectricRepository
  ) {}

  async execute({ page, pageSize, countryCode }: IRequest) {
    const ranking = await this.HydroelectricRepository.getPotencyRanking(
      countryCode
    )
    return this.formatRanking(ranking, page, pageSize)
  }

  formatRanking(
    ranking: {
      name: string
      amount: number
      country: string
    }[],
    page: number,
    pageSize: number
  ) {
    const x = []
    const data = []
    const position = []

    for (const [index, record] of ranking.entries()) {
      x.push(`${record.name} - ${record.country}`)
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
