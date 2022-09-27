import { IGetIllegalMiningPointsDTO } from '../dtos/IGetIllegalMiningPointsDTO'
import { IGetIllegalMiningRankingDTO } from '../dtos/IGetIllegalMiningRankingDTO'
import { IGetIllegalMiningTimeSeriesDTO } from '../dtos/IGetIllegalMiningTimeSeriesDTO'
import { IGetTotalIllegalMiningOccurrencesDTO } from '../dtos/IGetTotalIllegalMiningOccurencesDTO'
import { IllegalMining } from '../infrastructure/models/IllegalMining'

export interface IIllegalMinesByCountry {
  count: number
  countryCode: number
  country: string
}
export interface IIllegalMiningRepositoryApi {
  getPoints(data: IGetIllegalMiningPointsDTO): Promise<IllegalMining[]>
  getTotalOccurrences(
    filter: IGetTotalIllegalMiningOccurrencesDTO
  ): Promise<number>
  getTimeSeries(
    filter: IGetIllegalMiningTimeSeriesDTO
  ): Promise<{ x: number; y: number }[]>
  getSubstancesRanking(
    filter: IGetIllegalMiningRankingDTO
  ): Promise<{ name: string; amount: number }[]>
  getIllegalMiningByCountry(
    countryCode: number
  ): Promise<IIllegalMinesByCountry[]>
}
