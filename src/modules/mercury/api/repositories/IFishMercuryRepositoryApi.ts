import { IGetPointsDTO } from '../dtos/IGetPointsDTO'
import { IGetPublicationsTimesSeriesDTO } from '../dtos/IGetPublicationsTimeSeriesDTO'
import { IGetTotalPublicationsDTO } from '../dtos/IGetTotalPublicationsDTO'
import { FishMercury } from '../infrastructure/models/FishMercury'

export interface IFishMercuryRepositoryApi {
  getPoints(filters: IGetPointsDTO): Promise<FishMercury[]>
  getTotalPublications(filters: IGetTotalPublicationsDTO): Promise<number>
  getPublicationsTimeSeries(
    filters: IGetPublicationsTimesSeriesDTO
  ): Promise<{ x: number; y: number }[]>
  getPublicationsByCountry(): Promise<
    {
      count: number
      countryCode: number
      country: string
    }[]
  >
}
