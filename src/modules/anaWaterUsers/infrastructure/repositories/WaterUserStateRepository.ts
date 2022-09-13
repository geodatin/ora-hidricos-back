import {
  IRanking,
  IWaterUserRepository,
} from '@modules/anaWaterUsers/repositories/IWaterUserRepository'
import { Repository, getRepository, getManager, Not, IsNull } from 'typeorm'

import { WaterUserState } from '../models/WaterUserState'
import { WaterUserUnion } from '../models/WaterUserUnion'

export class WaterUserStateRepository implements IWaterUserRepository {
  private repository: Repository<WaterUserState>

  constructor() {
    this.repository = getRepository(WaterUserState)
  }

  async getGoalRanking(): Promise<IRanking[]> {
    const getRankingQuery = getManager()
      .createQueryBuilder()
      .select(`water_user.goal`, 'name')
      .addSelect('COUNT(1)', 'amount')
      .from('water_user_state', 'water_user')
      .where(`water_user.goal IS NOT NULL`)
      .groupBy(`water_user.goal`)
      .orderBy('amount', 'DESC')

    return await getRankingQuery.getRawMany()
  }

  async getCitiesRanking(): Promise<IRanking[]> {
    const getRankingQuery = this.repository
      .createQueryBuilder('water_user')
      .select(`water_user.city_name`, 'name')
      .addSelect('COUNT(1)', 'amount')
      .where(`water_user.city_name IS NOT NULL`)
      .groupBy(`water_user.city_name`)
      .orderBy('amount', 'DESC')

    return await getRankingQuery.getRawMany()
  }

  async getInterferenceRanking(): Promise<IRanking[]> {
    const getRankingQuery = this.repository
      .createQueryBuilder('water_user')
      .select(`water_user.interference_type`, 'name')
      .addSelect('COUNT(1)', 'amount')
      .where(`water_user.interference_type IS NOT NULL`)
      .groupBy(`water_user.interference_type`)
      .orderBy('amount', 'DESC')

    return await getRankingQuery.getRawMany()
  }

  async getBestowalRanking(
    rankingVariation: 'type' | 'situation'
  ): Promise<IRanking[]> {
    const getRankingQuery = this.repository
      .createQueryBuilder('water_user')
      .select(`water_user.bestowal_${rankingVariation}`, 'name')
      .addSelect('COUNT(1)', 'amount')
      .where(`water_user.bestowal_${rankingVariation} IS NOT NULL`)
      .groupBy(`water_user.bestowal_${rankingVariation}`)
      .orderBy('amount', 'DESC')

    return await getRankingQuery.getRawMany()
  }

  async getTotal(): Promise<number> {
    const count = await this.repository.count()
    return count
  }

  async getPoints(): Promise<WaterUserUnion[] | WaterUserState[]> {
    const waterUsers = await this.repository.find({
      where: {
        validDate: Not(IsNull()),
      },
    })
    return waterUsers
  }
}
