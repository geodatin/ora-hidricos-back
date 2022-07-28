import { Waterway } from '@modules/waterResources/api/infrastructure/models/Waterway'
import { getRepository, Repository } from 'typeorm'

import { ICreateWaterwayRecord } from '../../dtos/ICreateWaterwayRecord'
import { IWaterwayRepository } from '../../repositories/IWaterwayRepository'

export class WaterwayRepository implements IWaterwayRepository {
  private repository: Repository<Waterway>

  constructor() {
    this.repository = getRepository(Waterway)
  }

  async create(data: ICreateWaterwayRecord[]): Promise<void> {
    const newData = data.map((record) => {
      const newRecord = new Waterway()
      Object.assign(newRecord, {
        ...record,
        location: () => `ST_GeomFromGeoJSON('${record.geometry}')`,
      })
      return newRecord
    })
    await this.repository.save(newData)
  }
}
