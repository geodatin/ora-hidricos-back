import { IGetMiningMinePointsDTO } from '../dtos/IMiningMineDTOS'

export interface IMiningMineRepositoryApi {
  getPoints(data: IGetMiningMinePointsDTO): Promise<{ mvt: Buffer }>
}
