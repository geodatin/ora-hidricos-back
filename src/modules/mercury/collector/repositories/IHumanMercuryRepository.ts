import { ICreateHumanMercuryRecord } from '../dtos/ICreateHumanMercuryRecord'

export interface IHumanMercuryRepository {
  create(data: ICreateHumanMercuryRecord[]): Promise<void>
}
