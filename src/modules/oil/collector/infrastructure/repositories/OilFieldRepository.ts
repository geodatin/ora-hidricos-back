import { OilField } from '@modules/oil/api/infrastructure/models/OilField'
import { getRepository, Repository } from 'typeorm'

import { ICreateOilFieldRecord } from '../../dtos/ICreateOilFieldRecord'
import { IOilFieldRepository } from '../../repositories/IOilFieldRepository'

export class OilFieldRepository implements IOilFieldRepository {
  private repository: Repository<OilField>

  constructor() {
    this.repository = getRepository(OilField)
  }

  async create(data: ICreateOilFieldRecord[]): Promise<void> {
    const newData = data.map((record) => {
      const newRecord = new OilField()
      Object.assign(newRecord, {
        ...record,
        location: () => `ST_GeomFromGeoJSON('${record.geometry}')`,
      })
      return newRecord
    })
    await this.repository.save(newData)
  }
}
