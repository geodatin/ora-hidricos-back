import { Deforestation } from '@modules/soil/api/infrastructure/models/Deforestation'
import { getRepository, Repository } from 'typeorm'

import { ICreateDeforestationRecord } from '../../dtos/ICreateDeforestationRecord'
import { IDeforestationRepository } from '../../repositories/IDeforestationRepository'

export class DeforestationRepository implements IDeforestationRepository {
  private repository: Repository<Deforestation>

  constructor() {
    this.repository = getRepository(Deforestation)
  }

  async create(data: ICreateDeforestationRecord[]): Promise<void> {
    const newData = data.map((record) => {
      const newRecord = new Deforestation()
      Object.assign(newRecord, {
        ...record,
        location: () => `ST_GeomFromGeoJSON('${record.geometry}')`,
      })
      return newRecord
    })
    await this.repository.save(newData)
  }
}
