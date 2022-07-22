import { ICreateFishMercuryRecord } from '@modules/waterResources/collector/dtos/ICreateFishMercuryRecord'
import { ICreateHumanMercuryRecord } from '@modules/waterResources/collector/dtos/ICreateHumanMercuryRecord'
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
