import {
  IGetRankingRequestDTO,
  IGetRankingResponseDTO,
} from '../dtos/IGetRankingDTO'
import {
  IGetStatisticsRequestDTO,
  IGetStatisticsResponseDTO,
} from '../dtos/IGetStatisticsDTO'
import {
  IGetTimeSeriesRequestDTO,
  IGetTimeSeriesResponseDTO,
} from '../dtos/IGetTimeSeriesDTO'

export interface IWaterSurfaceRepository {
  getStatistics(
    params: IGetStatisticsRequestDTO
  ): Promise<IGetStatisticsResponseDTO>

  getTimeSeries(
    params: IGetTimeSeriesRequestDTO
  ): Promise<IGetTimeSeriesResponseDTO[]>

  getRanking(params: IGetRankingRequestDTO): Promise<{
    initialArea: IGetRankingResponseDTO[]
    finalArea: IGetRankingResponseDTO[]
  }>
}
