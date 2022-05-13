import { AmazonCountry } from '@modules/territory/infrastructure/typeorm/models/AmazonCountry'
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

import { WaterSurfaceCountryAnnual } from '../models/WaterSurfaceCountryAnnual'

export class WaterSurfaceCountryAnnualRepository
  implements IWaterSurfaceRepository
{
  private repository: Repository<WaterSurfaceCountryAnnual>

  constructor() {
    this.repository = getRepository(WaterSurfaceCountryAnnual)
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

    const finalAreaQuery = this.repository
      .createQueryBuilder('country')
      .select('SUM(area_ha)', 'area')
      .where('year = :finalYear', { finalYear })

    const initialAreaQuery = this.repository
      .createQueryBuilder('country')
      .select('SUM(area_ha)', 'area')
      .where('year = :initialYear', { initialYear })

    if (code) {
      finalAreaQuery.andWhere('code = :code', { code })
      initialAreaQuery.andWhere('code = :code', { code })
    }

    const { area: finalArea } = await finalAreaQuery.getRawOne()

    const { area: initialArea } = await initialAreaQuery.getRawOne()

    return {
      finalArea,
      initialArea,
    }
  }

  async getTimeSeries({
    code,
  }: IGetTimeSeriesRequestDTO): Promise<IGetTimeSeriesResponseDTO[]> {
    const timeSeriesQuery = this.repository
      .createQueryBuilder('country')
      .select('SUM(area_ha)', 'value')
      .addSelect('year', 'year')
      .groupBy('year')
      .orderBy('year', 'ASC')

    if (code) {
      timeSeriesQuery.where('code = :code', { code })
    }

    const timeSeries = await timeSeriesQuery.getRawMany()

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
        .select('country.name', 'name')
        .addSelect('surface.area_ha', 'area')
        .addSelect('surface.code', 'code')
        .innerJoin(AmazonCountry, 'country', 'surface.code = country.code')
        .where('surface.year = :initialYear', { initialYear })
        .orderBy('country.name')
        .getRawMany()
    }

    const { year: finalYear } = await this.repository
      .createQueryBuilder()
      .select('MAX(year)', 'year')
      .getRawOne()

    const finalArea = await this.repository
      .createQueryBuilder('surface')
      .select('country.name', 'name')
      .addSelect('surface.area_ha', 'area')
      .addSelect('surface.code', 'code')
      .innerJoin(AmazonCountry, 'country', 'surface.code = country.code')
      .where('surface.year = :finalYear', { finalYear })
      .orderBy('country.name')
      .getRawMany()

    return { initialArea, finalArea }
  }
}
