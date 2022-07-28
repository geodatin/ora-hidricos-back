import { ICreateWaterwayRecord } from '../dtos/ICreateWaterwayRecord'

export interface IWaterwayRepository {
  create(data: ICreateWaterwayRecord[]): Promise<void>
}
