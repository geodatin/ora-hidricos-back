import { FishMercury } from '../infrastructure/models/FishMercury'

export interface IFishMercuryRepositoryApi {
  getPoints(): Promise<FishMercury[]>
}
