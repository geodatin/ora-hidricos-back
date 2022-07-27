import { FishMercury } from '@modules/mercury/api/infrastructure/models/FishMercury'
import { getRepository, Repository } from 'typeorm'

import { IFishMercuryRepositoryApi } from '../../repositories/IFishMercuryRepositoryApi'

export class FishMercuryRepositoryApi implements IFishMercuryRepositoryApi {
  private repository: Repository<FishMercury>

  constructor() {
    this.repository = getRepository(FishMercury)
  }

  async getPoints(): Promise<FishMercury[]> {
    const records = await this.repository.find()
    return records
  }
}
