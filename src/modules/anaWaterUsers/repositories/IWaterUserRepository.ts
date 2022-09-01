import { WaterUserState } from '../infrastructure/models/WaterUserState'
import { WaterUserUnion } from '../infrastructure/models/WaterUserUnion'

export interface IRanking {
  name: string
  amount: number
}

export interface IWaterUserRepository {
  getPoints(): Promise<WaterUserUnion[] | WaterUserState[]>
  getTotal(): Promise<number>
  getBestowalRanking(
    rankingVariation: 'type' | 'situation'
  ): Promise<IRanking[]>
  getInterferenceRanking(): Promise<IRanking[]>
  getCitiesRanking(): Promise<IRanking[]>
  getGoalRanking(): Promise<IRanking[]>
}
