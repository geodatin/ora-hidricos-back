import { IFilterDTO } from '../dtos/IFilterDTO'
import { ITileDTO } from '../dtos/ITileDTO'
import { OrganicPollution } from '../infrastructure/models/OrganicPollution'

export interface IGetSituationMapResponse {
  name: string
  amount: number
}

export interface IGetShapeAsMvt {
  countryCode?: number
  tile: ITileDTO
}

export interface IOrganicPollutionRepository {
  create(data: OrganicPollution[]): Promise<void>
  getTotalPoints({ countryCode }: IFilterDTO): Promise<number>
  getSituationMap({
    countryCode,
  }: IFilterDTO): Promise<IGetSituationMapResponse[]>
  getShapeAsMvt(data: IGetShapeAsMvt): Promise<{ mvt: Buffer }>
}
