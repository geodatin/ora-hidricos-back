import { getRepository, Repository } from 'typeorm'

import { tileToEnvelope, envelopeToBoundsSQL } from '@shared/utils/tiles'

import { IGetMiningMinePointsDTO } from '../../dtos/IMiningMineDTOS'
import { IMiningMineRepositoryApi } from '../../repositories/IMiningMineRepositoryApi'
import { MiningMine } from '../models/MiningMine'

export class MiningMineRepositoryApi implements IMiningMineRepositoryApi {
  private repository: Repository<MiningMine>

  constructor() {
    this.repository = getRepository(MiningMine)
  }

  async getPoints({
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
}