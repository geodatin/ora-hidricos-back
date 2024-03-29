import { AmazonCountry } from '@modules/territory/infrastructure/typeorm/models/AmazonCountry'
import { getRepository, Repository } from 'typeorm'

import { tileToEnvelope, envelopeToBoundsSQL } from '@shared/utils/tiles'

import { IGetMiningMinePointsDTO } from '../../dtos/IMiningMineDTOS'
import {
  IMinesByCountry,
  IMiningMineRepositoryApi,
  IRanking,
  ISituationMap,
} from '../../repositories/IMiningMineRepositoryApi'
import { MiningMine } from '../models/MiningMine'

export class MiningMineRepositoryApi implements IMiningMineRepositoryApi {
  private repository: Repository<MiningMine>

  constructor() {
    this.repository = getRepository(MiningMine)
  }

  async getCompanyRanking(countryCode: number): Promise<IRanking[]> {
    const getCompanyRankingQuery = this.repository
      .createQueryBuilder('mining')
      .select('mining.company', 'name')
      .addSelect('COUNT(1)', 'amount')

    if (countryCode) {
      getCompanyRankingQuery.where('country_code = :countryCode', {
        countryCode,
      })
    }

    getCompanyRankingQuery
      .andWhere('mining.company IS NOT NULL')
      .groupBy('mining.company')
      .orderBy('amount', 'DESC')

    return await getCompanyRankingQuery.getRawMany()
  }

  async getTotalMineOccurrences(countryCode: number): Promise<number> {
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

  async getPointsAsJson({
    countryCode,
  }: IGetMiningMinePointsDTO): Promise<MiningMine[]> {
    const miningMineQuery = this.repository
      .createQueryBuilder('illegal_mining')
      .select('code', 'code')
      .addSelect('name', 'name')
      .addSelect('company', 'company')
      .addSelect('situation', 'situation')
      .addSelect('source', 'source')
      .addSelect('institution', 'institution')
      .addSelect('ST_AsGeoJSON(geometry)::json', 'geometry')

    if (countryCode) {
      miningMineQuery.where('country_code = :countryCode', {
        countryCode,
      })
    }

    const miningMine = await miningMineQuery.getRawMany()

    return miningMine
  }

  async getPointsAsMvt({
    countryCode,
    tile,
  }: IGetMiningMinePointsDTO): Promise<{ mvt: Buffer }> {
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
              code, name, company, situation, source, institution
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

  async getMinesByCountry(countryCode: number): Promise<IMinesByCountry[]> {
    const minesByCountry = this.repository
      .createQueryBuilder('mining')
      .select('country_code', 'countryCode')
      .addSelect('COUNT(1)', 'count')
      .addSelect('countries.name', 'country')
      .innerJoin(
        AmazonCountry,
        'countries',
        'countries.code = mining.country_code'
      )
      .groupBy('country_code')
      .addGroupBy('countries.name')
      .orderBy('count')

    if (countryCode) {
      minesByCountry.where('country_code = :countryCode', {
        countryCode,
      })
    }

    return minesByCountry.getRawMany()
  }

  async getSituationMap(countryCode: number): Promise<ISituationMap[]> {
    const getSituationAmountQuery = this.repository
      .createQueryBuilder('mining')
      .select('mining.situation', 'situation')
      .addSelect('COUNT(1)', 'amount')
      .addSelect(`'mining'`, 'type')

    if (countryCode) {
      getSituationAmountQuery.where('country_code = :countryCode', {
        countryCode,
      })
    }

    getSituationAmountQuery
      .andWhere('mining.situation IS NOT NULL')
      .groupBy('mining.situation')
      .orderBy('amount', 'DESC')

    return await getSituationAmountQuery.getRawMany()
  }
}
