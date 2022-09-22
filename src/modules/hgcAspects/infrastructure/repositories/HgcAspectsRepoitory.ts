import { IRanking } from '@modules/anaWaterUsers/repositories/IWaterUserRepository'
import { IHgcAspectsRepository } from '@modules/hgcAspects/repositories/IHgcAspectsRepository'
import { getRepository, Repository } from 'typeorm'

import { HgcAspects } from '../models/HgcAspects'

export class HgcAspectsRepository implements IHgcAspectsRepository {
  private repository: Repository<HgcAspects>

  constructor() {
    this.repository = getRepository(HgcAspects)
  }

  async getShape(): Promise<HgcAspects[]> {
    const records = await this.repository.find()
    return records
  }

  async getDomainRanking(): Promise<IRanking[]> {
    const getRankingQuery = this.repository
      .createQueryBuilder('hgc')
      .select(`hgc.domain`, 'name')
      .addSelect('COUNT(1)', 'amount')
      .where(`hgc.domain IS NOT NULL`)
      .groupBy('hgc.domain')
      .orderBy('amount', 'DESC')

    return await getRankingQuery.getRawMany()
  }

  async getAspectsRanking(): Promise<IRanking[]> {
    const getRankingQuery = this.repository
      .createQueryBuilder('hgc')
      .select(`hgc.aspect`, 'name')
      .addSelect('COUNT(1)', 'amount')
      .where(`hgc.aspect IS NOT NULL`)
      .groupBy('hgc.aspect')
      .orderBy('amount', 'DESC')

    return await getRankingQuery.getRawMany()
  }

  async getTotal(): Promise<number> {
    const count = await this.repository.count()
    return count
  }

  async create(data: HgcAspects[]): Promise<void> {
    await this.repository.save(data)
  }
}
