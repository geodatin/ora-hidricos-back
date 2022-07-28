import { inject, injectable } from 'tsyringe'

import { IExternalDatabaseProvider } from '@shared/providers/externalDatabaseProvider/interface/IExternalDatabaseProvider'
import { collectorLog } from '@shared/utils/log'

import { IWaterwayRepository } from '../../repositories/IWaterwayRepository'

@injectable()
export class CreateWaterwayRecordService {
  constructor(
    @inject('WaterwayRepository')
    private WaterwayRepository: IWaterwayRepository,
    @inject('ExternalDatabaseProvider')
    private externalDatabaseProvider: IExternalDatabaseProvider
  ) {}

  async execute() {
    collectorLog('Inserting data for illegal mining info!')
    const records = await this.externalDatabaseProvider.getWaterwayInfo()
    collectorLog(records)
    await this.WaterwayRepository.create(records)
  }
}
