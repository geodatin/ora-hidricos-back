import { HumanMercury } from '@modules/mercury/api/infrastructure/models/HumanMercury'
import { getRepository, Repository } from 'typeorm'

import { ICreateHumanMercuryRecord } from '../../dtos/ICreateHumanMercuryRecord'
import { IHumanMercuryRepository } from '../../repositories/IHumanMercuryRepository'

export class HumanMercuryRepository implements IHumanMercuryRepository {
  private repository: Repository<HumanMercury>

  constructor() {
    this.repository = getRepository(HumanMercury)
  }

  async create(data: ICreateHumanMercuryRecord[]): Promise<void> {
    const newData = data.map((record) => {
      const newRecord = new HumanMercury()
      Object.assign(newRecord, {
        ...record,
        location: () =>
          `ST_SetSRID(ST_MakePoint(${record.longitude}, ${record.latitude}), 4326)`,
      })
      return newRecord
    })
    await this.repository.save(newData)
  }
}
