import { autoInjectable, inject } from 'tsyringe'

import { IExternalDatabaseProvider } from '@shared/providers/externalDatabaseProvider/interface/IExternalDatabaseProvider'
import { collectorLog } from '@shared/utils/log'

import { IHydroelectricRepository } from '../repositories/IHydroelectricRepository'

@autoInjectable()
export class HydroelectricCollector {
  constructor(
    @inject('HydroelectricRepository')
    private HydroelectricRepository?: IHydroelectricRepository,
    @inject('ExternalDatabaseProvider')
    private externalDatabaseProvider?: IExternalDatabaseProvider
  ) {}

  async execute() {
    collectorLog('Inserting data for hydroelectric!')
    const records = await this.externalDatabaseProvider.getHydroelectricInfo()
    records.forEach((record) => {
      record.geometry = {
        type: 'Point',
        coordinates: [
          record.geometry.coordinates[0],
          record.geometry.coordinates[1],
        ],
      }
    })
    collectorLog(records[0].geometry)
    await this.HydroelectricRepository.create(records)
  }
}
