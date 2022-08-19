import { getRepository, Repository } from 'typeorm'

import { IGetIllegalMiningPointsDTO } from '../../dtos/IGetIllegalMiningPointsDTO'
import { IIllegalMiningRepositoryApi } from '../../repositories/IIllegalMiningRepositoryApi'
import { IllegalMining } from '../models/IllegalMining'

export class IllegalMiningRepositoryApi implements IIllegalMiningRepositoryApi {
  private repository: Repository<IllegalMining>

  constructor() {
    this.repository = getRepository(IllegalMining)
  }
  async getPoints({
    code,
    countryCode,
  }: IGetIllegalMiningPointsDTO): Promise<IllegalMining[]> {
    const illegalMiningQuery = this.repository
      .createQueryBuilder('illegal_mining')
      .select('code', 'code')
      .addSelect('name', 'name')
      .addSelect('description', 'description')
      .addSelect('exploration_method', 'explorationMethod')
      .addSelect('substance', 'substance')
      .addSelect('contamination', 'contamination')
      .addSelect('situation_end', 'situationEnd')
      .addSelect('information_source', 'informationSource')
      .addSelect('institution', 'institution')
      .addSelect('link', 'link')

    if (code) {
      illegalMiningQuery
        .addSelect('ST_AsGeoJSON(geometry)::json', 'geometry')
        .where('code = :code', { code })
    } else {
      illegalMiningQuery.addSelect(
        'ST_AsGeoJSON(ST_Centroid(geometry))::json',
        'geometry'
      )

      if (countryCode) {
        illegalMiningQuery.where('country_code = :countryCode', {
          countryCode,
        })
      }
    }

    const illegalMining = await illegalMiningQuery.getRawMany()

    return illegalMining
  }
}
