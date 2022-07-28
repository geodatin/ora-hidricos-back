import { inject, injectable } from 'tsyringe'

import { IExternalDatabaseProvider } from '@shared/providers/externalDatabaseProvider/interface/IExternalDatabaseProvider'
import { collectorLog } from '@shared/utils/log'
import { splitArray } from '@shared/utils/splitArray'

import { IDeforestationRepository } from '../../repositories/IDeforestationRepository'

@injectable()
export class CreateDeforestationRecordService {
  constructor(
    @inject('DeforestationRepository')
    private deforestationRepository: IDeforestationRepository,
    @inject('ExternalDatabaseProvider')
    private externalDatabaseProvider: IExternalDatabaseProvider
  ) {}

  async execute() {
    collectorLog('Inserting data for deforestation!')
    const records = await this.externalDatabaseProvider.getDeforestationInfo()
    collectorLog(records[0])
    const splittedArray = splitArray(records, 1000)
    for (const array of splittedArray) {
      await this.deforestationRepository.create(array)
    }
  }
}
