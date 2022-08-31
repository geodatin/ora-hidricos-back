import { IFilterDTO } from '@modules/pollution/dtos/IFilterDTO'
import {
  IGetShapeAsMvt,
  IGetSituationMapResponse,
  IOrganicPollutionRepository,
} from '@modules/pollution/repositories/IOrganicPollutionRepository'
import { Repository, getRepository } from 'typeorm'

import { envelopeToBoundsSQL, tileToEnvelope } from '@shared/utils/tiles'

import { OrganicPollution } from '../models/OrganicPollution'

export class OrganicPollutionRepository implements IOrganicPollutionRepository {
  private repository: Repository<OrganicPollution>

  constructor() {
    this.repository = getRepository(OrganicPollution)
  }
  async getShapeAsMvt({
    tile,
    countryCode,
  }: IGetShapeAsMvt): Promise<{ mvt: Buffer }> {
    let conditions = ''
    const parameters = []
    if (countryCode) {
      conditions = 'AND country_code = $1'
      parameters.push(countryCode)
    }

    const envelope = tileToEnvelope(tile)
    const envelopeBoundsSQL = envelopeToBoundsSQL(envelope)

    const [mvt] = await this.repository.query(
      `
      WITH
      bounds AS (
          SELECT
              ${envelopeBoundsSQL} AS geom,
              ${envelopeBoundsSQL}::box2d AS b2d
      ), 
      mvtgeom AS (
          SELECT
              ST_AsMVTGeom(ST_Transform(w.geometry, 3857), bounds.b2d) AS geom,
              code, sub_bacia, condition, concentration
          FROM hydric.${this.repository.metadata.tableName} AS w, bounds
          WHERE ST_Intersects(w.geometry, ST_Transform(bounds.geom, 4326))
          ${conditions}
      )
      SELECT ST_AsMVT(mvtgeom.*) as mvt FROM mvtgeom 
      `,
      parameters
    )

    return mvt
  }

  async getSituationMap({
    countryCode,
  }: IFilterDTO): Promise<IGetSituationMapResponse[]> {
    const getSituationAmountQuery = this.repository
      .createQueryBuilder('organic_pollution')
      .select('organic_pollution.condition', 'situation')
      .addSelect('COUNT(1)', 'amount')
      .addSelect(`'pollution'`, 'type')

    if (countryCode) {
      getSituationAmountQuery.where('country_code = :countryCode', {
        countryCode,
      })
    }

    getSituationAmountQuery
      .andWhere('organic_pollution.condition IS NOT NULL')
      .groupBy('organic_pollution.condition')
      .orderBy('amount', 'DESC')

    return await getSituationAmountQuery.getRawMany()
  }

  async getTotalPoints({ countryCode }: IFilterDTO): Promise<number> {
    let count = 0
    let where = {}
    if (countryCode) {
      where = {
        ...where,
        countryCode,
      }
    }
    count = await this.repository.count({ where })
    return count
  }

  async create(data: OrganicPollution[]): Promise<void> {
    const newData = data.map((record) => {
      const newRecord = new OrganicPollution()
      Object.assign(newRecord, {
        ...record,
      })
      return newRecord
    })
    await this.repository
      .createQueryBuilder()
      .insert()
      .values(newData)
      .execute()
  }
}
