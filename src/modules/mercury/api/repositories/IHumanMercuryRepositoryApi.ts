import { HumanMercury } from '../infrastructure/models/HumanMercury'

export interface IHumanMercuryRepositoryApi {
  getPoints(): Promise<HumanMercury[]>
}
