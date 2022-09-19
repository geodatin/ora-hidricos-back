import { autoInjectable, inject } from 'tsyringe'

import { IExternalDatabaseProvider } from '@shared/providers/externalDatabaseProvider/interface/IExternalDatabaseProvider'
import { collectorLog } from '@shared/utils/log'

import { IFloodZoneRepository } from '../repositories/IFloodZoneRepository'

@autoInjectable()
export class FloodZoneCollector {
  constructor(
    @inject('FloodZoneRepository')
    private FloodZoneRepository?: IFloodZoneRepository,
    @inject('ExternalDatabaseProvider')
    private externalDatabaseProvider?: IExternalDatabaseProvider
  ) {}

  async execute() {
    collectorLog('Inserting data for flood zones!')
    for (let i = 1; i <= 12; i++) {
      const records = await this.externalDatabaseProvider.getFloodZonesInfo(i)
      await this.FloodZoneRepository.create(records)
    }
  }
}
