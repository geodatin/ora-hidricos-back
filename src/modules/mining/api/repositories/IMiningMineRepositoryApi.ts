import { IGetMiningMinePointsDTO } from '../dtos/IMiningMineDTOS'
import { MiningMine } from '../infrastructure/models/MiningMine'

export interface IRanking {
  name: string
  amount: number
}

export interface IMinesByCountry {
  count: number
  countryCode: number
  country: string
}

export interface ISituationMap {
  name: string
  amount: number
}

export interface IMiningMineRepositoryApi {
  getPointsAsMvt(data: IGetMiningMinePointsDTO): Promise<{ mvt: Buffer }>
  getPointsAsJson(data: IGetMiningMinePointsDTO): Promise<MiningMine[]>
  getTotalMineOccurrences(countryCode: number): Promise<number>
  getCompanyRanking(countryCode: number): Promise<IRanking[]>
  getMinesByCountry(countryCode: number): Promise<IMinesByCountry[]>
  getSituationMap(countryCode: number): Promise<ISituationMap[]>
}
