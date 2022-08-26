import {
  IGetShapeAsMvtRequestDTO,
  IGetShapeAsMvtResponseDTO,
} from '../dtos/IGetShapeAsMvtDTO'

export interface IWaterwayRepositoryApi {
  getShapeAsMvt(
    data: IGetShapeAsMvtRequestDTO
  ): Promise<IGetShapeAsMvtResponseDTO>
}
