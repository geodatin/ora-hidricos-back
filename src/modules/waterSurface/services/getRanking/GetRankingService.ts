import { IGetRankingResponseDTO } from '@modules/waterSurface/dtos/IGetRankingDTO'
import { IWaterSurfaceRepository } from '@modules/waterSurface/repositories/IWaterSurfaceRepository'
import { inject, injectable } from 'tsyringe'

import { AppError } from '@shared/errors/AppError'
import { countPages, paginate } from '@shared/utils/paginate'

interface IRequest {
  territoryType: string
  rankingType: string
  page: number
  pageSize: number
  code: number
}

@injectable()
export class GetRankingService {
  constructor(
    @inject('WaterSurfaceCityAnnualRepository')
    private waterSurfaceCityAnnualRepository: IWaterSurfaceRepository,
    @inject('WaterSurfaceStateAnnualRepository')
    private waterSurfaceStateAnnualRepository: IWaterSurfaceRepository,
    @inject('WaterSurfaceCountryAnnualRepository')
    private waterSurfaceCountryAnnualRepository: IWaterSurfaceRepository
  ) {}

  async execute({
    territoryType,
    rankingType,
    page,
    pageSize,
    code,
  }: IRequest) {
    const repository = this.getRepository(territoryType)

    const rankingTypeOptions = ['area', 'winLoss']

    if (!rankingTypeOptions.includes(rankingType)) {
      throw new AppError('Invalid ranking type!')
    }

    if (territoryType !== 'country' && code === null) {
      throw new AppError(
        `Code is required for ${territoryType} territory type!`
      )
    }

    const { finalArea, initialArea } = await repository.getRanking({
      rankingType: rankingType as 'area' | 'winLoss',
    })

    const formattedResponse = this.formatAreaRanking(
      finalArea,
      page,
      pageSize,
      code,
      initialArea
    )

    return formattedResponse
  }

  getRepository(territoryType: string): IWaterSurfaceRepository {
    const repositories = {
      city: this.waterSurfaceCityAnnualRepository,
      state: this.waterSurfaceStateAnnualRepository,
      country: this.waterSurfaceCountryAnnualRepository,
    }

    if (!(territoryType in repositories)) {
      throw new AppError('Invalid territory type!')
    }

    return repositories[territoryType]
  }

  formatAreaRanking(
    finalArea: IGetRankingResponseDTO[],
    page: number,
    pageSize: number,
    code: number,
    initialArea?: IGetRankingResponseDTO[]
  ) {
    const x = []
    const data = []
    const position = []
    let focusPage: number

    if (initialArea) {
      for (const [index] of finalArea.entries()) {
        finalArea[index].area = finalArea[index].area - initialArea[index].area
      }
    }

    finalArea
      .sort((a, b) => {
        if (a.area < b.area) return -1
        if (a.area > b.area) return 1
        return 0
      })
      .reverse()

    for (const [index, record] of finalArea.entries()) {
      x.push(record.name)
      data.push(record.area)
      position.push(index + 1)
      if (record.code === code) {
        focusPage = Math.ceil(index / pageSize)
      }
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
      focusPage,
    }
  }
}
