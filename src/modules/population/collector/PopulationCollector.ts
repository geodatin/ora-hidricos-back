import { autoInjectable, inject } from 'tsyringe'

import { IExternalDatabaseProvider } from '@shared/providers/externalDatabaseProvider/interface/IExternalDatabaseProvider'
import { collectorLog } from '@shared/utils/log'

import { IPopulationRepository } from '../repositories/IPopulationRepository'

@autoInjectable()
export class PopulationCollector {
  constructor(
    @inject('PopulationRepository')
    private PopulationRepository?: IPopulationRepository,
    @inject('ExternalDatabaseProvider')
    private externalDatabaseProvider?: IExternalDatabaseProvider
  ) {}

  async execute() {
    collectorLog('Inserting data for Population!')
    const records = await this.externalDatabaseProvider.getPopulationInfo()
    collectorLog(records[0])
    await this.PopulationRepository.create(records)
  }
}
