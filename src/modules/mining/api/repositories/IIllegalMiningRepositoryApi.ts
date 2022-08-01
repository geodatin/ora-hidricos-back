import { IGetIllegalMiningPointsDTO } from '../dtos/IGetIllegalMiningPointsDTO'
import { IllegalMining } from '../infrastructure/models/IllegalMining'

export interface IIllegalMiningRepositoryApi {
  getPoints(data: IGetIllegalMiningPointsDTO): Promise<IllegalMining[]>
}
