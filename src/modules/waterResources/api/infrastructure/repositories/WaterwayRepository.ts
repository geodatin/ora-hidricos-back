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
  async getTotal(): Promise<number> {
    const total = await this.repository.count()
    return total
  }
  async getShapeAsGeoJson(): Promise<Waterway[]> {
    const shape = await this.repository.query(`
    SELECT json_build_object(
      'type', 'FeatureCollection',
      'features', json_agg(
          json_build_object(
              'type',       'Feature',
              'geometry',   ST_AsGeoJSON(geometry)::json,
              'properties', json_build_object(
                  'code', code,
                  'country', country,
                  'name', name
              )
          )
      )
  ) as shape
  FROM hydric.waterway limit 1;
    `)
    return shape
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
