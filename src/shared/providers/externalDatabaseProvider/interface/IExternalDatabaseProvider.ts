import { ICreateFishMercuryRecord } from '@modules/waterResources/collector/dtos/ICreateFishMercuryRecord'
import { ICreateHumanMercuryRecord } from '@modules/waterResources/collector/dtos/ICreateHumanMercuryRecord'

export interface IExternalDatabaseProvider {
  getHumanMercuryInfo(): Promise<ICreateHumanMercuryRecord[]>
  getFishMercuryInfo(): Promise<ICreateFishMercuryRecord[]>
}
