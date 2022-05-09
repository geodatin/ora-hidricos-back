import { IAmazonCountryRepository } from '@modules/territory/repositories/IAmazonCountryRepository'
import { getRepository, Repository } from 'typeorm'

import { AmazonCountry } from '../models/AmazonCountry'

export class AmazonCountryRepository implements IAmazonCountryRepository {
  private repository: Repository<AmazonCountry>

  constructor() {
    this.repository = getRepository(AmazonCountry)
  }

  async getNames(
    name: string
  ): Promise<{ code: string; name: string; type: string }[]> {
    const names = await this.repository
      .createQueryBuilder('country')
      .select('name', 'name')
      .addSelect('code', 'code')
      .where('name ILIKE(:name)', { name: `%${name}%` })
      .getRawMany()
    return names
  }
}
