import { IPopulationRepository } from '@modules/population/repositories/IPopulationRepository'
import { inject, injectable } from 'tsyringe'

import { countPages, paginate } from '@shared/utils/paginate'

interface IRequest {
  page: number
  pageSize: number
}

@injectable()
export class GetWatershedRankingService {
  constructor(
    @inject('PopulationRepository')
    private PopulationRepository: IPopulationRepository
  ) {}

  async execute({ page, pageSize }: IRequest) {
    const ranking = await this.PopulationRepository.getWatershedRanking()
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
