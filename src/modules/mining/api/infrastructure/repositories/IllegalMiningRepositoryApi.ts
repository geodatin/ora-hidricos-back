import { getRepository, Repository } from 'typeorm'

import { IGetIllegalMiningPointsDTO } from '../../dtos/IGetIllegalMiningPointsDTO'
import { IGetIllegalMiningRankingDTO } from '../../dtos/IGetIllegalMiningRankingDTO'
import { IGetIllegalMiningTimeSeriesDTO } from '../../dtos/IGetIllegalMiningTimeSeriesDTO'
import { IGetTotalIllegalMiningOccurrencesDTO } from '../../dtos/IGetTotalIllegalMiningOccurencesDTO'
import { IIllegalMiningRepositoryApi } from '../../repositories/IIllegalMiningRepositoryApi'
import { IllegalMining } from '../models/IllegalMining'

export class IllegalMiningRepositoryApi implements IIllegalMiningRepositoryApi {
  private repository: Repository<IllegalMining>

  constructor() {
    this.repository = getRepository(IllegalMining)
  }

  async getPoints({
    code,
    countryCode,
  }: IGetIllegalMiningPointsDTO): Promise<IllegalMining[]> {
    const illegalMiningQuery = this.repository
      .createQueryBuilder('illegal_mining')
      .select('code', 'code')
      .addSelect('name', 'name')
      .addSelect('description', 'description')
      .addSelect('exploration_method', 'explorationMethod')
      .addSelect('substance', 'substance')
      .addSelect('contamination', 'contamination')
      .addSelect('situation_end', 'situationEnd')
      .addSelect('information_source', 'informationSource')
      .addSelect('institution', 'institution')
      .addSelect('link', 'link')

    if (code) {
      illegalMiningQuery
        .addSelect('ST_AsGeoJSON(geometry)::json', 'geometry')
        .where('code = :code', { code })
    } else {
      illegalMiningQuery.addSelect(
        'ST_AsGeoJSON(ST_Centroid(geometry))::json',
        'geometry'
      )

      if (countryCode) {
        illegalMiningQuery.where('country_code = :countryCode', {
          countryCode,
        })
      }
    }

    const illegalMining = await illegalMiningQuery.getRawMany()

    return illegalMining
  }

  async getTotalOccurrences({
    countryCode,
  }: IGetTotalIllegalMiningOccurrencesDTO): Promise<number> {
    let count = 0
    let where = {}
    if (countryCode) {
      where = {
        ...where,
        countryCode,
      }
    }
    count = await this.repository.count({ where })
    return count
  }

  async getTimeSeries({
    countryCode,
  }: IGetIllegalMiningTimeSeriesDTO): Promise<{ x: number; y: number }[]> {
    const timeSeriesQuery = this.repository
      .createQueryBuilder('mining')
      .select('situation_end', 'x')
      .addSelect('COUNT(1)', 'y')

    if (countryCode) {
      timeSeriesQuery.where('country_code = :countryCode', { countryCode })
    }

    return await timeSeriesQuery
      .andWhere('situation_end IS NOT NULL')
      .groupBy('situation_end')
      .orderBy('situation_end')
      .getRawMany()
  }

  async getSubstancesRanking({
    countryCode,
  }: IGetIllegalMiningRankingDTO): Promise<{ name: string; amount: number }[]> {
    const getSubstancesRankingQuery = this.repository
      .createQueryBuilder('mining')
      .select('mining.substance', 'name')
      .addSelect('COUNT(1)', 'amount')

    if (countryCode) {
      getSubstancesRankingQuery.where('country_code = :countryCode', {
        countryCode,
      })
    }

    getSubstancesRankingQuery
      .andWhere('mining.substance IS NOT NULL')
      .groupBy('mining.substance')
      .orderBy('amount', 'DESC')

    return await getSubstancesRankingQuery.getRawMany()
  }
}
