import { MiningMine } from '@modules/mining/api/infrastructure/models/MiningMine'
import { getRepository, Repository } from 'typeorm'

import { ICreateMiningMineRecord } from '../../dtos/ICreateMiningMineRecord'
import { IMiningMineRepository } from '../../repositories/IMiningMineRepository'

export class MiningMineRepository implements IMiningMineRepository {
  private repository: Repository<MiningMine>

  constructor() {
    this.repository = getRepository(MiningMine)
  }

  async create(data: ICreateMiningMineRecord[]): Promise<void> {
    const newData = data.map((record) => {
      const newRecord = new MiningMine()
      Object.assign(newRecord, {
        ...record,
        location: () => `ST_GeomFromGeoJSON('${record.geometry}')`,
      })
      return newRecord
    })
    await this.repository.save(newData)
  }
}
