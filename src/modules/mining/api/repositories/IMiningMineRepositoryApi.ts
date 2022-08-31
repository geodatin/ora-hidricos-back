import { IGetMiningMinePointsDTO } from '../dtos/IMiningMineDTOS'
import { MiningMine } from '../infrastructure/models/MiningMine'

export interface IMiningMineRepositoryApi {
  getPointsAsMvt(data: IGetMiningMinePointsDTO): Promise<{ mvt: Buffer }>
  getPointsAsJson(data: IGetMiningMinePointsDTO): Promise<MiningMine[]>
}
