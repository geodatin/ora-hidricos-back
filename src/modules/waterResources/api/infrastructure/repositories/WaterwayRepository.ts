import { getRepository, Repository } from 'typeorm'

import { tileToEnvelope, envelopeToBoundsSQL } from '@shared/utils/tiles'

import {
  IGetShapeAsMvtRequestDTO,
  IGetShapeAsMvtResponseDTO,
} from '../../dtos/IGetShapeAsMvtDTO'
import { IWaterwayRepositoryApi } from '../../repositories/IWatewayRepositoryApi'
import { Waterway } from '../models/Waterway'

export class WaterwayRepositoryApi implements IWaterwayRepositoryApi {
  private repository: Repository<Waterway>

  constructor() {
    this.repository = getRepository(Waterway)
  }
  async getShapeAsMvt({
    tile,
  }: IGetShapeAsMvtRequestDTO): Promise<IGetShapeAsMvtResponseDTO> {
    const envelope = tileToEnvelope(tile)
    const envelopeBoundsSQL = envelopeToBoundsSQL(envelope)

    const [mvt] = await this.repository.query(`
    WITH
    bounds AS (
        SELECT
            ${envelopeBoundsSQL} AS geom,
            ${envelopeBoundsSQL}::box2d AS b2d
    ), 
    mvtgeom AS (
        SELECT
            ST_AsMVTGeom(ST_Transform(w.geometry, 3857), bounds.b2d) AS geom,
            code, name, country
        FROM hydric.waterway AS w, bounds
        WHERE ST_Intersects(w.geometry, ST_Transform(bounds.geom, 4326))
    )
    SELECT ST_AsMVT(mvtgeom.*) as mvt FROM mvtgeom 
    `)
    return mvt
  }
}
