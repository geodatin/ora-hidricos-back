import { ICreateDeforestationRecord } from '../dtos/ICreateDeforestationRecord'

export interface IDeforestationRepository {
  create(data: ICreateDeforestationRecord[]): Promise<void>
}
