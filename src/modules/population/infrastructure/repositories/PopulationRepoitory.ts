import { IRanking } from '@modules/anaWaterUsers/repositories/IWaterUserRepository'
import { IPopulationRepository } from '@modules/population/repositories/IPopulationRepository'
import { getRepository, Repository } from 'typeorm'

import { Population } from '../models/Population'

export class PopulationRepository implements IPopulationRepository {
  private repository: Repository<Population>

  constructor() {
    this.repository = getRepository(Population)
  }

  async getShape(): Promise<Population[]> {
    const records = await this.repository.find()
    return records
  }

  async getWatershedRanking(): Promise<IRanking[]> {
    const getRankingQuery = this.repository
      .createQueryBuilder('population')
      .select(`population.nunivotto`, 'name')
      .addSelect('population.total', 'amount')
      .where(`population.nunivotto IS NOT NULL`)
      .orderBy('amount', 'DESC')

    return await getRankingQuery.getRawMany()
  }

  async getTotal(): Promise<number> {
    const { count } = await this.repository
      .createQueryBuilder('population')
      .select('SUM(population.total)', 'count')
      .getRawOne()
    return count
  }

  async create(data: Population[]): Promise<void> {
    await this.repository.save(data)
  }
}
