import { ICreateFishMercuryRecord } from '@modules/mercury/collector/dtos/ICreateFishMercuryRecord'
import { ICreateHumanMercuryRecord } from '@modules/mercury/collector/dtos/ICreateHumanMercuryRecord'
import { ICreateIllegalMiningRecord } from '@modules/mining/collector/dtos/ICreateIllegalMiningRecord'
import { ICreateMiningMineRecord } from '@modules/mining/collector/dtos/ICreateMiningMineRecord'
import { ICreateOilFieldRecord } from '@modules/oil/collector/dtos/ICreateOilFieldRecord'
import { ICreateDeforestationRecord } from '@modules/soil/collector/dtos/ICreateDeforestationRecord'
import { ICreateWaterwayRecord } from '@modules/waterResources/collector/dtos/ICreateWaterwayRecord'

export interface IExternalDatabaseProvider {
  getHumanMercuryInfo(): Promise<ICreateHumanMercuryRecord[]>
  getFishMercuryInfo(): Promise<ICreateFishMercuryRecord[]>
  getIllegalMiningInfo(): Promise<ICreateIllegalMiningRecord[]>
  getOilFieldInfo(): Promise<ICreateOilFieldRecord[]>
  getMiningMineInfo(): Promise<ICreateMiningMineRecord[]>
  getDeforestationInfo(): Promise<ICreateDeforestationRecord[]>
  getWaterwayInfo(): Promise<ICreateWaterwayRecord[]>
}
