import fs from 'fs'
import path from 'path'

import { insertShapefile } from '@shared/infrastructure/database/utils/insertShapefile'
import { renameColumns } from '@shared/infrastructure/database/utils/renameColumns'
import { download } from '@shared/utils/download'
import { unzipFile } from '@shared/utils/unzip'

export class AnaWaterUsersCollector {
  private tmpPath: string

  constructor() {
    this.tmpPath = path.join(__dirname, '..', '..', '..', '..', 'tmp')
  }

  async execute() {
    /*     await this.collectAndInsert(
      'https://opendata.arcgis.com/api/v3/datasets/2cfab409c9ee4592aa4c404ec556807b_1/downloads/data?format=shp&spatialRefId=4326&where=%28ING_NM_REGIAO_HIDRO+IN+%28%27Regi%C3%A3o+Hidrogr%C3%A1fica+AMAZ%C3%94NICA%27%29%29',
      'water_user_union'
    ) */
    /*     await this.collectAndInsert(
      'https://opendata.arcgis.com/api/v3/datasets/ace634a092b9494fb78bc6aafed41c14_0/downloads/data?format=shp&spatialRefId=4326&where=%28ING_NM_REGIAO_HIDRO+IN+%28%27Regi%C3%A3o+Hidrogr%C3%A1fica+AMAZ%C3%94NICA%27%29%29',
      'water_user_state'
    ) */
    const columnsToRename = [
      {
        currentName: 'tpo_ds',
        newName: 'bestowal_type',
      },
      {
        currentName: 'tch_ds',
        newName: 'water_body_type',
      },
      {
        currentName: 'tin_ds',
        newName: 'interference_type',
      },
      {
        currentName: 'org_nm',
        newName: 'org_name',
      },
      {
        currentName: 'tsp_ds',
        newName: 'bestowal_situation',
      },
      {
        currentName: 'tsu_ds',
        newName: 'interference_subtype',
      },
      {
        currentName: 'int_nm_cor',
        newName: 'water_body_name',
      },
      {
        currentName: 'tfn_ds',
        newName: 'goal',
      },
      {
        currentName: 'dt_outorga',
        newName: 'valid_date',
      },
      {
        currentName: 'int_qt_vaz',
        newName: 'avg_flow',
      },
      {
        currentName: 'int_qt_v_1',
        newName: 'max_flow',
      },
      {
        currentName: 'int_qt_vol',
        newName: 'volume',
      },
      {
        currentName: 'geom',
        newName: 'geometry',
      },
      {
        currentName: 'ing_nm_mun',
        newName: 'city_name',
      },
    ]
    await renameColumns(columnsToRename, 'hydric', 'water_user_union')
    await renameColumns(columnsToRename, 'hydric', 'water_user_state')
  }

  async collectAndInsert(url: string, tableName: string) {
    const filePath = path.resolve(path.join(this.tmpPath, 'shapefile.zip'))
    const outputFolder = path.resolve(path.join(this.tmpPath, 'shapefile'))
    await download(url, filePath)
    await unzipFile(filePath, outputFolder)
    const fileName = this.getFileName(outputFolder)
    await insertShapefile(
      `${path.resolve(path.join(this.tmpPath, 'shapefile', fileName))}.shp`,
      tableName,
      4326,
      'hydric'
    )
  }

  private getFileName(folder: string): string {
    return fs
      .readdirSync(folder)[0]
      .substring(0, fs.readdirSync(folder)[0].length - 4)
  }
}
