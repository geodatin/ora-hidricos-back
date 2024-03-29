import { ICreateFishMercuryRecord } from '@modules/mercury/collector/dtos/ICreateFishMercuryRecord'
import { ICreateHumanMercuryRecord } from '@modules/mercury/collector/dtos/ICreateHumanMercuryRecord'
import { ICreateIllegalMiningRecord } from '@modules/mining/collector/dtos/ICreateIllegalMiningRecord'
import { ICreateMiningMineRecord } from '@modules/mining/collector/dtos/ICreateMiningMineRecord'
import { ICreateOilFieldRecord } from '@modules/oil/collector/dtos/ICreateOilFieldRecord'
import { OrganicPollution } from '@modules/pollution/infrastructure/models/OrganicPollution'
import { FloodZone } from '@modules/soil/api/infrastructure/models/FloodZone'
import { ICreateDeforestationRecord } from '@modules/soil/collector/dtos/ICreateDeforestationRecord'
import { ICreateWaterwayRecord } from '@modules/waterResources/collector/dtos/ICreateWaterwayRecord'

export interface IExternalDatabaseProvider {
  getHumanMercuryInfo(): Promise<ICreateHumanMercuryRecord[]>
  getFishMercuryInfo(): Promise<ICreateFishMercuryRecord[]>
  getIllegalMiningInfo(): Promise<ICreateIllegalMiningRecord[]>
  getOilFieldInfo(): Promise<ICreateOilFieldRecord[]>
  getMiningMineInfo(): Promise<ICreateMiningMineRecord[]>
  getDeforestationInfo(): Promise<ICreateDeforestationRecord[]>
  getWaterwayInfo(size: number): Promise<ICreateWaterwayRecord[]>
  getOrganicPollutionInfo(size: number): Promise<OrganicPollution[]>
  getFloodZonesInfo(size: number): Promise<FloodZone[]>
  getHydroelectricInfo(): Promise<any[]>
  getPopulationInfo(): Promise<any[]>
  getHgcAspectsInfo(): Promise<any[]>
}
