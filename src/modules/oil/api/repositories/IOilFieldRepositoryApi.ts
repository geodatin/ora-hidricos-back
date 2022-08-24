import { IGetOilFieldPointsDTO } from '../dtos/IGetOilFieldPointsDTO'
import { OilField } from '../infrastructure/models/OilField'

export interface IOilFieldRepositoryApi {
  getPoints(data: IGetOilFieldPointsDTO): Promise<OilField[]>
  getTotal(data: IGetOilFieldPointsDTO): Promise<number>
  getCompanyRanking(
    data: IGetOilFieldPointsDTO
  ): Promise<{ name: string; amount: number }[]>
  getSituationAmount(
    data: IGetOilFieldPointsDTO
  ): Promise<{ situation: string; amount: number; type: string }[]>
}
