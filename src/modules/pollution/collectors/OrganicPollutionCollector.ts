import { autoInjectable, inject } from 'tsyringe'

import { IExternalDatabaseProvider } from '@shared/providers/externalDatabaseProvider/interface/IExternalDatabaseProvider'
import { collectorLog } from '@shared/utils/log'
import { splitArray } from '@shared/utils/splitArray'

import { IOrganicPollutionRepository } from '../repositories/IOrganicPollutionRepository'

@autoInjectable()
export class OrganicPollutionCollector {
  constructor(
    @inject('OrganicPollutionRepository')
    private OrganicPollutionRepository?: IOrganicPollutionRepository,
    @inject('ExternalDatabaseProvider')
    private externalDatabaseProvider?: IExternalDatabaseProvider
  ) {}

  async execute() {
    collectorLog('Inserting data for organic pollution info!')
    for (let i = 0; i <= 12; i++) {
      const records =
        await this.externalDatabaseProvider.getOrganicPollutionInfo(i)
      collectorLog(records[0])
      collectorLog('chunck ', i)
      const splittedArray = splitArray(records, 1000)
      for (const array of splittedArray) {
        await this.OrganicPollutionRepository.create(array)
      }
    }
  }
}
