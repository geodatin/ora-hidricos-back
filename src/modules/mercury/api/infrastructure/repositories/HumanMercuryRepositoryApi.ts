import { HumanMercury } from '@modules/mercury/api/infrastructure/models/HumanMercury'
import { getRepository, Repository } from 'typeorm'

import { IHumanMercuryRepositoryApi } from '../../repositories/IHumanMercuryRepositoryApi'

export class HumanMercuryRepositoryApi implements IHumanMercuryRepositoryApi {
  private repository: Repository<HumanMercury>

  constructor() {
    this.repository = getRepository(HumanMercury)
  }

  async getPoints(): Promise<HumanMercury[]> {
    const records = await this.repository.find()
    return records
  }
}
