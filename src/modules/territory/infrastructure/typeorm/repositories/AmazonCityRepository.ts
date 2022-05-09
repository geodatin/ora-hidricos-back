import { IAmazonCityRepository } from '@modules/territory/repositories/IAmazonCityRepository'
import { getRepository, Repository } from 'typeorm'

import { AmazonCity } from '../models/AmazonCity'

export class AmazonCityRepository implements IAmazonCityRepository {
  private repository: Repository<AmazonCity>

  constructor() {
    this.repository = getRepository(AmazonCity)
  }

  async getNames(
    name: string
  ): Promise<{ code: string; name: string; type: string }[]> {
    const names = await this.repository
      .createQueryBuilder('city')
      .select('name', 'name')
      .addSelect('code', 'code')
      .where('name ILIKE(:name)', { name: `%${name}%` })
      .getRawMany()
    return names
  }
}
