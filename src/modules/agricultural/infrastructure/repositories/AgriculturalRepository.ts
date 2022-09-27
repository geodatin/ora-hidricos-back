import { getRepository, Repository } from 'typeorm'

import {
  IAgriculturalRepository,
  IRanking,
} from '../../repositories/IAgriculturalRepository'
import { Agricultural } from '../models/Agricultural'

export class AgriculturalRepository implements IAgriculturalRepository {
  private repository: Repository<Agricultural>

  constructor() {
    this.repository = getRepository(Agricultural)
  }

  async getTotalArea(): Promise<number> {
    const { count } = await this.repository
      .createQueryBuilder('agriculture')
      .select('SUM(area_km2)', 'count')
      .getRawOne()

    return count
  }

  async getAreaByName(): Promise<IRanking[]> {
    const ranking = await this.repository
      .createQueryBuilder('agriculture')
      .select('SUM(area_km2)', 'amount')
      .addSelect('nome', 'name')
      .groupBy('name')
      .orderBy('amount', 'DESC')
      .getRawMany()

    return ranking
  }
}
