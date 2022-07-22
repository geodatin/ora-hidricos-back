import { FishMercury } from '@modules/waterResources/api/infrastructure/models/FishMercury'
import { HumanMercury } from '@modules/waterResources/api/infrastructure/models/HumanMercury'
import { getRepository, Repository } from 'typeorm'

import { ICreateFishMercuryRecord } from '../../dtos/ICreateFishMercuryRecord'
import { IFishMercuryRepository } from '../../repositories/IFishMercuryRepository'

export class FishMercuryRepository implements IFishMercuryRepository {
  private repository: Repository<FishMercury>

  constructor() {
    this.repository = getRepository(FishMercury)
  }

  async create(data: ICreateFishMercuryRecord[]): Promise<void> {
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
