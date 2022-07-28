import { ICreateOilFieldRecord } from '../dtos/ICreateOilFieldRecord'

export interface IOilFieldRepository {
  create(data: ICreateOilFieldRecord[]): Promise<void>
}
