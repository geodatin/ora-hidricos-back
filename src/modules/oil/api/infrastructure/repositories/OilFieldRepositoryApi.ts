import { getRepository, Repository } from 'typeorm'

import { IGetOilFieldPointsDTO } from '../../dtos/IGetOilFieldPointsDTO'
import { IOilFieldRepositoryApi } from '../../repositories/IOilFieldRepositoryApi'
import { OilField } from '../models/OilField'

export class OilFieldRepositoryApi implements IOilFieldRepositoryApi {
  private repository: Repository<OilField>

  constructor() {
    this.repository = getRepository(OilField)
  }

  async getPoints({
    code,
    countryCode,
  }: IGetOilFieldPointsDTO): Promise<OilField[]> {
    const oilFieldsQuery = this.repository
      .createQueryBuilder('oil_field')
      .select('code', 'code')
      .addSelect('country', 'country')
      .addSelect('name', 'name')
      .addSelect('company', 'company')
      .addSelect('situation', 'situation')
      .addSelect('source', 'source')
      .addSelect('institution', 'institution')

    if (code) {
      oilFieldsQuery
        .addSelect('ST_AsGeoJSON(geometry)::json', 'geometry')
        .where('code = :code', { code })
    } else {
      oilFieldsQuery.addSelect(
        'ST_AsGeoJSON(ST_Centroid(geometry))::json',
        'geometry'
      )

      if (countryCode) {
        oilFieldsQuery.where('country_code = :countryCode', {
          countryCode,
        })
      }
    }

    const oilFields = await oilFieldsQuery.getRawMany()

    return oilFields
  }
}
