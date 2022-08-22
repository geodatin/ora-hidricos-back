import { FishMercury } from '@modules/mercury/api/infrastructure/models/FishMercury'
import { AmazonCountry } from '@modules/territory/infrastructure/typeorm/models/AmazonCountry'
import { getRepository, Repository } from 'typeorm'

import { IGetPointsDTO } from '../../dtos/IGetPointsDTO'
import { IGetTotalPublicationsByCountryDTO } from '../../dtos/IGetPublicationsByCountryDTO'
import { IGetPublicationsTimesSeriesDTO } from '../../dtos/IGetPublicationsTimeSeriesDTO'
import { IGetTotalPublicationsDTO } from '../../dtos/IGetTotalPublicationsDTO'
import { IFishMercuryRepositoryApi } from '../../repositories/IFishMercuryRepositoryApi'

export class FishMercuryRepositoryApi implements IFishMercuryRepositoryApi {
  private repository: Repository<FishMercury>

  constructor() {
    this.repository = getRepository(FishMercury)
  }

  async getPoints({ countryCode }: IGetPointsDTO): Promise<FishMercury[]> {
    let records = []
    let where = {}
    if (countryCode) {
      where = {
        countryCode,
      }
    }
    records = await this.repository.find({ where })
    return records
  }

  async getTotalPublications({
    countryCode,
  }: IGetTotalPublicationsDTO): Promise<number> {
    let count = 0
    let where = {}
    if (countryCode) {
      where = {
        countryCode,
      }
    }
    count = await this.repository.count({ where })
    return count
  }

  async getPublicationsTimeSeries({
    countryCode,
  }: IGetPublicationsTimesSeriesDTO): Promise<{ x: number; y: number }[]> {
    const timeSeriesQuery = this.repository
      .createQueryBuilder('mercury')
      .select('publication_year', 'x')
      .addSelect('COUNT(1)', 'y')

    if (countryCode) {
      timeSeriesQuery.where('country_code = :countryCode', { countryCode })
    }

    return await timeSeriesQuery
      .groupBy('publication_year')
      .orderBy('publication_year')
      .getRawMany()
  }

  async getPublicationsByCountry({
    countryCode,
  }: IGetTotalPublicationsByCountryDTO): Promise<
    {
      count: number
      countryCode: number
      country: string
    }[]
  > {
    const publicationsByCountryQuery = this.repository
      .createQueryBuilder('mercury')
      .select('country_code', 'countryCode')
      .addSelect('COUNT(1)', 'count')
      .addSelect('countries.name', 'country')
      .innerJoin(
        AmazonCountry,
        'countries',
        'countries.code = mercury.country_code'
      )
      .groupBy('country_code')
      .addGroupBy('countries.name')
      .orderBy('count')

    if (countryCode) {
      publicationsByCountryQuery.where('country_code = :countryCode', {
        countryCode,
      })
    }

    return publicationsByCountryQuery.getRawMany()
  }
}
