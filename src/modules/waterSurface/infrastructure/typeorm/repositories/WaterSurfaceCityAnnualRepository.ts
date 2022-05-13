import { AmazonCity } from '@modules/territory/infrastructure/typeorm/models/AmazonCity'
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

import { WaterSurfaceCityAnnual } from '../models/WaterSurfaceCityAnnual'

export class WaterSurfaceCityAnnualRepository
  implements IWaterSurfaceRepository
{
  private repository: Repository<WaterSurfaceCityAnnual>

  constructor() {
    this.repository = getRepository(WaterSurfaceCityAnnual)
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
      .createQueryBuilder('city')
      .select('SUM(area_ha)', 'area')
      .where('code = :code', { code })
      .andWhere('year = :finalYear', { finalYear })
      .getRawOne()

    const { area: initialArea } = await this.repository
      .createQueryBuilder('city')
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
      .createQueryBuilder('city')
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
        .select('city.name', 'name')
        .addSelect('surface.area_ha', 'area')
        .addSelect('surface.code', 'code')
        .innerJoin(AmazonCity, 'city', 'surface.code = city.code')
        .where('surface.year = :initialYear', { initialYear })
        .orderBy('city.name')
        .getRawMany()
    }

    const { year: finalYear } = await this.repository
      .createQueryBuilder()
      .select('MAX(year)', 'year')
      .getRawOne()

    const finalArea = await this.repository
      .createQueryBuilder('surface')
      .select('city.name', 'name')
      .addSelect('surface.area_ha', 'area')
      .addSelect('surface.code', 'code')
      .innerJoin(AmazonCity, 'city', 'surface.code = city.code')
      .where('surface.year = :finalYear', { finalYear })
      .orderBy('city.name')
      .getRawMany()

    return { initialArea, finalArea }
  }
}
