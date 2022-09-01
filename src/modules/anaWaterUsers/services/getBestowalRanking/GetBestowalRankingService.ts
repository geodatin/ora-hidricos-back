import { IWaterUserRepository } from '@modules/anaWaterUsers/repositories/IWaterUserRepository'
import { inject, injectable } from 'tsyringe'

import { countPages, paginate } from '@shared/utils/paginate'

interface IRequest {
  territoryType: string
  page: number
  pageSize: number
  rankingVariation: 'type' | 'situation'
}

@injectable()
export class GetBestowalRankingService {
  constructor(
    @inject('WaterUserStateRepository')
    private WaterUserStateRepository: IWaterUserRepository,
    @inject('WaterUserUnionRepository')
    private WaterUserUnionRepository: IWaterUserRepository
  ) {}

  async execute({ territoryType, page, pageSize, rankingVariation }: IRequest) {
    const repository = this.getRepository(territoryType)
    const ranking = await repository.getBestowalRanking(rankingVariation)
    return this.formatRanking(ranking, page, pageSize)
  }

  private getRepository(territoryType: string): IWaterUserRepository {
    const repositories = {
      state: this.WaterUserStateRepository,
      union: this.WaterUserUnionRepository,
    }

    return repositories[territoryType]
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
