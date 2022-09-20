import { getRepository, Repository } from 'typeorm'

import {
  IHydroelectricRepository,
  IRanking,
} from '../../repositories/IHydroelectricRepository'
import { Hydroelectric } from '../models/Hydroelectric'

export class HydroelectricRepository implements IHydroelectricRepository {
  private repository: Repository<Hydroelectric>

  constructor() {
    this.repository = getRepository(Hydroelectric)
  }

  async getPoints(countryCode: number): Promise<Hydroelectric[]> {
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

  async getPotencyRanking(countryCode: number): Promise<IRanking[]> {
    const getRankingQuery = this.repository
      .createQueryBuilder('hydroelectric')
      .select(`hydroelectric.name`, 'name')
      .addSelect('hydroelectric.potency', 'amount')
      .where(`hydroelectric.name IS NOT NULL`)
      .orderBy('amount', 'DESC')

    if (countryCode) {
      getRankingQuery.where('country_code = :countryCode', { countryCode })
    }

    return await getRankingQuery.getRawMany()
  }

  async getTotal(countryCode: number): Promise<number> {
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

  async getCountriesRanking(countryCode: number): Promise<IRanking[]> {
    const getRankingQuery = this.repository
      .createQueryBuilder('hydroelectric')
      .select(`hydroelectric.country`, 'name')
      .addSelect('COUNT(1)', 'amount')
      .where(`hydroelectric.country IS NOT NULL`)
      .groupBy(`hydroelectric.country`)
      .orderBy('amount', 'DESC')

    if (countryCode) {
      getRankingQuery.where('country_code = :countryCode', { countryCode })
    }

    return await getRankingQuery.getRawMany()
  }

  async create(data: Hydroelectric[]): Promise<void> {
    await this.repository.save(data)
  }
}
