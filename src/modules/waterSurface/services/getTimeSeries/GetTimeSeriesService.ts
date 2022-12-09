import { IWaterSurfaceRepository } from '@modules/waterSurface/repositories/IWaterSurfaceRepository'
import { inject, injectable } from 'tsyringe'

import { AppError } from '@shared/errors/AppError'

interface IRequest {
  territoryType: string
  code: number
}

@injectable()
export class GetTimeSeriesService {
  constructor(
    @inject('WaterSurfaceCityAnnualRepository')
    private waterSurfaceCityAnnualRepository: IWaterSurfaceRepository,
    @inject('WaterSurfaceStateAnnualRepository')
    private waterSurfaceStateAnnualRepository: IWaterSurfaceRepository,
    @inject('WaterSurfaceCountryAnnualRepository')
    private waterSurfaceCountryAnnualRepository: IWaterSurfaceRepository
  ) {}

  async execute({ territoryType, code }: IRequest) {
    const repository = this.getRepository(territoryType)

    if (territoryType !== 'country' && code === null) {
      throw new AppError(
        `Code is required for ${territoryType} territory type!`
      )
    }

    const timeSeries = await repository.getTimeSeries({ code })

    const response = {
      x: [],
      y: [],
    }

    timeSeries.forEach((record) => {
      response.x.push(record.year)
      response.y.push(record.value / 100)
    })

    return response
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
}
