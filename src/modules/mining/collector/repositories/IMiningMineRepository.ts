import { ICreateMiningMineRecord } from '../dtos/ICreateMiningMineRecord'

export interface IMiningMineRepository {
  create(data: ICreateMiningMineRecord[]): Promise<void>
}
