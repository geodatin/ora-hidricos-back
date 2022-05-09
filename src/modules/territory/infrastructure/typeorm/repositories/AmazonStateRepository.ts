import { IAmazonStateRepository } from '@modules/territory/repositories/IAmazonStateRepository'
import { getRepository, Repository } from 'typeorm'

import { AmazonState } from '../models/AmazonState'

export class AmazonStateRepository implements IAmazonStateRepository {
  private repository: Repository<AmazonState>

  constructor() {
    this.repository = getRepository(AmazonState)
  }

  async getNames(
    name: string
  ): Promise<{ code: string; name: string; type: string }[]> {
    const names = await this.repository
      .createQueryBuilder('state')
      .select('name', 'name')
      .addSelect('code', 'code')
      .where('name ILIKE(:name)', { name: `%${name}%` })
      .getRawMany()
    return names
  }
}
