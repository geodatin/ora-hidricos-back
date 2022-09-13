import { IWaterUserRepository } from '@modules/anaWaterUsers/repositories/IWaterUserRepository'
import moment from 'moment'
import { inject, injectable } from 'tsyringe'

import { formatDate } from '@shared/infrastructure/database/utils/formatDate'
import { toGeojson } from '@shared/utils/toGeojson'

interface IRequest {
  territoryType: string
}

@injectable()
export class GetPointsService {
  constructor(
    @inject('WaterUserStateRepository')
    private WaterUserStateRepository: IWaterUserRepository,
    @inject('WaterUserUnionRepository')
    private WaterUserUnionRepository: IWaterUserRepository
  ) {}

  async execute({ territoryType }: IRequest) {
    const repository = this.getRepository(territoryType)
    const data = await repository.getPoints()
    return this.formatPoints(territoryType, data)
  }

  private getRepository(territoryType: string): IWaterUserRepository {
    const repositories = {
      state: this.WaterUserStateRepository,
      union: this.WaterUserUnionRepository,
    }

    return repositories[territoryType]
  }

  private formatPoints(territoryType: string, data: any) {
    if (territoryType === 'state') {
      const pointsToBeTransformed = []
      for (const point of data) {
        if (point.validDate) {
          const date = moment(formatDate(point.validDate))
          if (date.isSameOrAfter(moment())) {
            console.log(point)
            pointsToBeTransformed.push(point)
          }
        }
      }
      return toGeojson(pointsToBeTransformed, 'geometry')
    }
    return toGeojson(data, 'geometry')
  }
}
