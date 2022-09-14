import {
  IGetShapeAsMvtRequestDTO,
  IGetShapeAsMvtResponseDTO,
} from '../dtos/IGetShapeAsMvtDTO'
import { Waterway } from '../infrastructure/models/Waterway'

export interface IWaterwayRepositoryApi {
  getShapeAsMvt(
    data: IGetShapeAsMvtRequestDTO
  ): Promise<IGetShapeAsMvtResponseDTO>
  getShapeAsGeoJson(): Promise<Waterway[]>
  getTotal(): Promise<number>
}
