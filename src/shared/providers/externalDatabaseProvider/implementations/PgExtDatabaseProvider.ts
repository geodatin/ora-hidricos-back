import { ICreateFishMercuryRecord } from '@modules/mercury/collector/dtos/ICreateFishMercuryRecord'
import { ICreateHumanMercuryRecord } from '@modules/mercury/collector/dtos/ICreateHumanMercuryRecord'
import { ICreateIllegalMiningRecord } from '@modules/mining/collector/dtos/ICreateIllegalMiningRecord'
import { ICreateMiningMineRecord } from '@modules/mining/collector/dtos/ICreateMiningMineRecord'
import { ICreateOilFieldRecord } from '@modules/oil/collector/dtos/ICreateOilFieldRecord'
import { ICreateDeforestationRecord } from '@modules/soil/collector/dtos/ICreateDeforestationRecord'
import { ICreateWaterwayRecord } from '@modules/waterResources/collector/dtos/ICreateWaterwayRecord'
import { Pool } from 'pg'

import { IExternalDatabaseProvider } from '../interface/IExternalDatabaseProvider'

export class PgExtDatabaseProvider implements IExternalDatabaseProvider {
  async getHumanMercuryInfo(): Promise<ICreateHumanMercuryRecord[]> {
    const pool = this.connect()
    const { rows } = await pool.query(
      `SELECT 
        study,
        yearpub::integer as "publicationYear",
        x as latitude,
        y as longitude,
        author,
        title,
        agegrup as "ageGroup",
        state,
        samplenumb as "sampleNumber",
        CASE WHEN hg_min_1 = '-' THEN null WHEN hg_min_1 = '<0.05' THEN 0.05 ELSE hg_min_1::numeric END as "hgMin",
        CASE WHEN hg_max_1 = '-' THEN null ELSE hg_max_1::numeric END as "hgMax",
        CASE WHEN hg_mean = '-' THEN null ELSE hg_mean::numeric END as "hgMean",
        CASE WHEN hg_median = '-' THEN null ELSE hg_median::numeric END as "hgMedian",
        yearcollet as "collectionYear",
        community,
        unit as "measurementUnit"
      FROM produto_3."QLD_Mercurio_Humanos_BHA_WWF_2021_P"`
    )
    await pool.end()
    return rows
  }

  async getFishMercuryInfo(): Promise<ICreateFishMercuryRecord[]> {
    const pool = this.connect()
    const { rows } = await pool.query(
      `SELECT 
        study,
        yearoub::integer as "publicationYear",
        x as latitude,
        y as longitude,
        author,
        title,
        state,
        CASE WHEN samplenumb = '-' THEN null ELSE samplenumb::numeric END  as "sampleNumber",
        CASE WHEN hg_min_1 = '-' THEN null WHEN hg_min_1 = '<0.05' THEN 0.05 ELSE hg_min_1::numeric END as "hgMin",
        CASE WHEN hg_max_1 = '-' THEN null ELSE hg_max_1::numeric END as "hgMax",
        CASE WHEN hg_mean = '-' THEN null ELSE hg_mean::numeric END as "hgMean",
        CASE WHEN hg_median = '-' THEN null ELSE hg_median::numeric END as "hgMedian",
        yearcollec as "collectionYear",
        community,
        unit as "measurementUnit"
      FROM produto_3."QLD_Mercurio_Peixes_BHA_WWF_2021_P"`
    )
    await pool.end()
    return rows
  }

  async getIllegalMiningInfo(): Promise<ICreateIllegalMiningRecord[]> {
    const pool = this.connect()
    const { rows } = await pool.query(
      `SELECT 
        ST_AsGeoJSON(ST_Transform(geom, 4326))::jsonb as geometry,
        descripci as description,
        metodoexpl as "explorationMethod",
        substancia as substance,
        contaminan as contamination,
        CASE WHEN fecha_situ = 's.i.' THEN null ELSE fecha_situ::numeric END as "situationEnd",
        fuenteinfo as "informationSource",
        instituici as institution,
        link,
        nombre as name
      FROM produto_3."ANT_Mineracao_Ilegal_BHA_RAISG_2020_A"
      UNION
      SELECT 
        ST_AsGeoJSON(ST_Transform(geom, 4326))::jsonb as geometry,
        descripci as description,
        metodoexpl as "explorationMethod",
        substancia as substance,
        contaminan as contamination,
        CASE WHEN fecha_situ = 's.i.' THEN null ELSE fecha_situ::numeric END as "situationEnd",
        fuenteinfo as "informationSource",
        instituici as institution,
        link,
        nombre as name
      FROM  produto_3."ANT_Mineracao_Ilegal_BHA_RAISG_2020_L"
      UNION
      SELECT 
        ST_AsGeoJSON(ST_Transform(geom, 4326))::jsonb as geometry,
        descripci as description,
        metodoexpl as "explorationMethod",
        substancia as substance,
        contaminan as contamination,
        CASE WHEN fecha_situ = 's.i.' THEN null ELSE fecha_situ::numeric END as "situationEnd",
        fuenteinfo as "informationSource",
        instituici as institution,
        link,
        nombre as name
      FROM produto_3."ANT_Mineracao_Ilegal_BHA_RAISG_2020_P"
      UNION
      SELECT 
        ST_AsGeoJSON(ST_Transform(geom, 4326))::jsonb as geometry,
        descripci as description,
        metodoexpl as "explorationMethod",
        substancia as substance,
        contaminan as contamination,
        CASE WHEN fecha_situ = 's.i.' THEN null ELSE fecha_situ::numeric END as "situationEnd",
        fuenteinfo as "informationSource",
        instituici as institution,
        link,
        nombre as name
      FROM produto_3."ANT_Mineracao_Ilegal_Cabeceiras_BHA_COBRAPE_2021_A"`
    )
    await pool.end()
    return rows
  }

  async getOilFieldInfo(): Promise<ICreateOilFieldRecord[]> {
    const pool = this.connect()
    const { rows } = await pool.query(
      `SELECT 
      ST_AsGeoJSON(ST_Transform(geom, 4326))::jsonb as geometry,
        pais as country,
        nombre as name,
        cia as company,
        situacion as situation,
        fuente_fec as source,
        institucio as institution,
        codigo as extCode
      FROM produto_3."ANT_ Lotes_Petroliferos_BHA_RAISG_2020_A"`
    )
    await pool.end()
    return rows
  }

  async getMiningMineInfo(): Promise<ICreateMiningMineRecord[]> {
    const pool = this.connect()
    const { rows } = await pool.query(
      `SELECT 
      ST_AsGeoJSON(ST_Transform(geom, 4326))::jsonb as geometry,
        pais as country,
        nombre as name,
        cia as company,
        situacion as situation,
        fuente_fec as source,
        institucio as institution,
        codigo as "extCode"
      FROM produto_3."ANT_Lavras_Mineracao_BHA_RAISG_2020_A"`
    )
    await pool.end()
    return rows
  }

  async getDeforestationInfo(): Promise<ICreateDeforestationRecord[]> {
    const pool = this.connect()
    const { rows } = await pool.query(
      `SELECT 
      ST_AsGeoJSON(ST_Transform(geom, 4326))::jsonb as geometry,
        fid_bho_20::varchar as "idBho",
        nunivotto1::varchar as "watershedId",
        dn::varchar as year,
        fid_venezu::varchar as "countryId",
        'Venezuela' as country
      FROM produto_3."ANT_Desmatamento_Cabeceiras_Venezuela_COBRAPE_2021_A"`
    )
    await pool.end()
    return rows
  }

  async getWaterwayInfo(size: number): Promise<ICreateWaterwayRecord[]> {
    const pool = this.connect()
    const { rows } = await pool.query(
      `SELECT 
      ST_AsGeoJSON(ST_Transform(geom, 4326))::jsonb as geometry,
        nombre as name,
        pais as country
      FROM produto_3."TRA_Hidrovias_BHA_OTCA_2021_L" offset ${
        size - 1
      } limit ${size}`
    )
    await pool.end()
    return rows
  }

  private connect() {
    return new Pool({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: 'water-quality',
      password: process.env.DB_PASSWORD,
      port: Number(process.env.DB_PORT),
    })
  }
}
