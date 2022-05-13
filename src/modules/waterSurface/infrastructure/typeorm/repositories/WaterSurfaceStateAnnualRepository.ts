import { AmazonState } from '@modules/territory/infrastructure/typeorm/models/AmazonState'
import {
  IGetRankingRequestDTO,
  IGetRankingResponseDTO,
} from '@modules/waterSurface/dtos/IGetRankingDTO'
import {
  IGetStatisticsRequestDTO,
  IGetStatisticsResponseDTO,
} from '@modules/waterSurface/dtos/IGetStatisticsDTO'
import {
  IGetTimeSeriesRequestDTO,
  IGetTimeSeriesResponseDTO,
} from '@modules/waterSurface/dtos/IGetTimeSeriesDTO'
import { IWaterSurfaceRepository } from '@modules/waterSurface/repositories/IWaterSurfaceRepository'
import { getRepository, Repository } from 'typeorm'

import { WaterSurfaceStateAnnual } from '../models/WaterSurfaceStateAnnual'

export class WaterSurfaceStateAnnualRepository
  implements IWaterSurfaceRepository
{
  private repository: Repository<WaterSurfaceStateAnnual>

  constructor() {
    this.repository = getRepository(WaterSurfaceStateAnnual)
  }

  async getStatistics({
    code,
  }: IGetStatisticsRequestDTO): Promise<IGetStatisticsResponseDTO> {
    const { year: finalYear } = await this.repository
      .createQueryBuilder()
      .select('MAX(year)', 'year')
      .getRawOne()

    const { year: initialYear } = await this.repository
      .createQueryBuilder()
      .select('MIN(year)', 'year')
      .getRawOne()

    const { area: finalArea } = await this.repository
      .createQueryBuilder('state')
      .select('SUM(area_ha)', 'area')
      .where('code = :code', { code })
      .andWhere('year = :finalYear', { finalYear })
      .getRawOne()

    const { area: initialArea } = await this.repository
      .createQueryBuilder('state')
      .select('SUM(area_ha)', 'area')
      .where('code = :code', { code })
      .andWhere('year = :initialYear', { initialYear })
      .getRawOne()

    return {
      finalArea,
      initialArea,
    }
  }

  async getTimeSeries({
    code,
  }: IGetTimeSeriesRequestDTO): Promise<IGetTimeSeriesResponseDTO[]> {
    const timeSeries = await this.repository
      .createQueryBuilder('state')
      .select('SUM(area_ha)', 'value')
      .addSelect('year', 'year')
      .where('code = :code', { code })
      .groupBy('year')
      .orderBy('year', 'ASC')
      .getRawMany()

    return timeSeries
  }

  async getRanking({ rankingType }: IGetRankingRequestDTO): Promise<{
    initialArea: IGetRankingResponseDTO[]
    finalArea: IGetRankingResponseDTO[]
  }> {
    let initialArea = null

    if (rankingType === 'winLoss') {
      const { year: initialYear } = await this.repository
        .createQueryBuilder()
        .select('MIN(year)', 'year')
        .getRawOne()

      initialArea = await this.repository
        .createQueryBuilder('surface')
        .select('state.name', 'name')
        .addSelect('surface.area_ha', 'area')
        .addSelect('surface.code', 'code')
        .innerJoin(AmazonState, 'state', 'surface.code = state.code')
        .where('surface.year = :initialYear', { initialYear })
        .orderBy('state.name')
        .getRawMany()
    }

    const { year: finalYear } = await this.repository
      .createQueryBuilder()
      .select('MAX(year)', 'year')
      .getRawOne()

    const finalArea = await this.repository
      .createQueryBuilder('surface')
      .select('state.name', 'name')
      .addSelect('surface.area_ha', 'area')
      .addSelect('surface.code', 'code')
      .innerJoin(AmazonState, 'state', 'surface.code = state.code')
      .where('surface.year = :finalYear', { finalYear })
      .orderBy('state.name')
      .getRawMany()

    return { initialArea, finalArea }
  }
}
