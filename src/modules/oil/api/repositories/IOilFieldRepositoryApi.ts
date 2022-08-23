import { IGetOilFieldPointsDTO } from '../dtos/IGetOilFieldPointsDTO'
import { OilField } from '../infrastructure/models/OilField'

export interface IOilFieldRepositoryApi {
  getPoints(data: IGetOilFieldPointsDTO): Promise<OilField[]>
  getTotal(data: IGetOilFieldPointsDTO): Promise<number>
}
