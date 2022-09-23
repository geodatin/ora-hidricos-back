import { IAmazonCountryRepository } from '@modules/territory/repositories/IAmazonCountryRepository'
import { getRepository, Repository } from 'typeorm'

import { AmazonCountry } from '../models/AmazonCountry'

export class AmazonCountryRepository implements IAmazonCountryRepository {
  private repository: Repository<AmazonCountry>

  constructor() {
    this.repository = getRepository(AmazonCountry)
  }

  async getAreaByCountry(): Promise<any[]> {
    const results = await this.repository
      .createQueryBuilder('country')
      .select('perc_pais', 'count')
      .addSelect('code', 'countryCode')
      .addSelect('name', 'country')
      .getRawMany()

    return results
  }

  async getCountryRanking(): Promise<any[]> {
    const results = await this.repository
      .createQueryBuilder('country')
      .select('km2_amazo', 'amount')
      .addSelect('name', 'name')
      .orderBy('km2_amazo', 'DESC')
      .getRawMany()

    return results
  }

  async getTotalWatershedArea(): Promise<number> {
    const { count } = await this.repository
      .createQueryBuilder('country')
      .select('SUM(km2_amazo)', 'count')
      .getRawOne()

    return count
  }

  async getNames(
    name: string
  ): Promise<{ code: string; name: string; type: string }[]> {
    const names = await this.repository
      .createQueryBuilder('country')
      .select('name', 'name')
      .addSelect('code', 'code')
      .where('name ILIKE(:name)', { name: `%${name}%` })
      .getRawMany()
    return names
  }
}
