import { ICreateIllegalMiningRecord } from '../dtos/ICreateIllegalMiningRecord'

export interface IIllegalMiningRepository {
  create(data: ICreateIllegalMiningRecord[]): Promise<void>
}
