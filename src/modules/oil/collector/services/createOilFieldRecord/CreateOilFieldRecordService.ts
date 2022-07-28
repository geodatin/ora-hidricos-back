import { inject, injectable } from 'tsyringe'

import { IExternalDatabaseProvider } from '@shared/providers/externalDatabaseProvider/interface/IExternalDatabaseProvider'
import { collectorLog } from '@shared/utils/log'

import { IOilFieldRepository } from '../../repositories/IOilFieldRepository'

@injectable()
export class CreateOilFieldRecordService {
  constructor(
    @inject('OilFieldRepository')
    private OilFieldRepository: IOilFieldRepository,
    @inject('ExternalDatabaseProvider')
    private externalDatabaseProvider: IExternalDatabaseProvider
  ) {}

  async execute() {
    collectorLog('Inserting data for illegal mining info!')
    const records = await this.externalDatabaseProvider.getOilFieldInfo()
    collectorLog(records)
    await this.OilFieldRepository.create(records)
  }
}
