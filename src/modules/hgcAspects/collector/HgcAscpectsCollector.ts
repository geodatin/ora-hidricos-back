import { autoInjectable, inject } from 'tsyringe'

import { IExternalDatabaseProvider } from '@shared/providers/externalDatabaseProvider/interface/IExternalDatabaseProvider'
import { collectorLog } from '@shared/utils/log'
import { splitArray } from '@shared/utils/splitArray'

import { IHgcAspectsRepository } from '../repositories/IHgcAspectsRepository'

@autoInjectable()
export class HgcAspectsCollector {
  constructor(
    @inject('HgcAspectsRepository')
    private HgcAspectsRepository?: IHgcAspectsRepository,
    @inject('ExternalDatabaseProvider')
    private externalDatabaseProvider?: IExternalDatabaseProvider
  ) {}

  async execute() {
    collectorLog('Inserting data for HgcAspects!')
    const records = await this.externalDatabaseProvider.getHgcAspectsInfo()
    collectorLog(records[0])
    const splittedArray = splitArray(records, 1000)
    for (const array of splittedArray) {
      await this.HgcAspectsRepository.create(array)
    }
  }
}
