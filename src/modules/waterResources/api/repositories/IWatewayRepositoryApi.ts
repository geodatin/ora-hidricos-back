import {
  IGetShapeAsMvtRequestDTO,
  IGetShapeAsMvtResponseDTO,
} from '../dtos/IGetShapeAsMvtDTO'
import { Waterway } from '../infrastructure/models/Waterway'

export interface IRanking {
  name: string
  amount: number
}

export interface IWaterwayRepositoryApi {
  getShapeAsMvt(
    data: IGetShapeAsMvtRequestDTO
  ): Promise<IGetShapeAsMvtResponseDTO>
  getShapeAsGeoJson(): Promise<Waterway[]>
  getTotal(): Promise<number>
  getCountriesRanking(): Promise<IRanking[]>
}
