import { FloodZone } from '@modules/soil/api/infrastructure/models/FloodZone'
import { getRepository, Repository } from 'typeorm'

import {
  IFloodZoneRepository,
  IRanking,
} from '../../repositories/IFloodZoneRepository'

export class FloodZoneRepository implements IFloodZoneRepository {
  private repository: Repository<FloodZone>

  constructor() {
    this.repository = getRepository(FloodZone)
  }

  async getTotalArea(): Promise<number> {
    const { count } = await this.repository
      .createQueryBuilder('flood_zone')
      .select('SUM(area)', 'count')
      .getRawOne()

    return count
  }

  async getAreaByZone(): Promise<IRanking[]> {
    const ranking = await this.repository
      .createQueryBuilder('flood_zone')
      .select('area', 'amount')
      .addSelect('name', 'name')
      .orderBy('area', 'DESC')
      .getRawMany()

    return ranking
  }

  async create(data: FloodZone[]): Promise<void> {
    const newData = data.map((record) => {
      const newRecord = new FloodZone()
      Object.assign(newRecord, {
        ...record,
      })
      return newRecord
    })
    await this.repository.save(newData)
  }
}
