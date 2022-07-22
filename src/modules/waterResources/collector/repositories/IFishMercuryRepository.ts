import { ICreateFishMercuryRecord } from '../dtos/ICreateFishMercuryRecord'

export interface IFishMercuryRepository {
  create(data: ICreateFishMercuryRecord[]): Promise<void>
}
