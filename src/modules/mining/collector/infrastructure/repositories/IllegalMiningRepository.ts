import { IllegalMining } from '@modules/mining/api/infrastructure/models/IllegalMining'
import { getRepository, Repository } from 'typeorm'

import { ICreateIllegalMiningRecord } from '../../dtos/ICreateIllegalMiningRecord'
import { IIllegalMiningRepository } from '../../repositories/IIllegalMiningRepository'

export class IllegalMiningRepository implements IIllegalMiningRepository {
  private repository: Repository<IllegalMining>

  constructor() {
    this.repository = getRepository(IllegalMining)
  }

  async create(data: ICreateIllegalMiningRecord[]): Promise<void> {
    const newData = data.map((record) => {
      const newRecord = new IllegalMining()
      Object.assign(newRecord, {
        ...record,
        location: () => `ST_GeomFromGeoJSON('${record.geometry}')`,
      })
      return newRecord
    })
    await this.repository.save(newData)
  }
}
