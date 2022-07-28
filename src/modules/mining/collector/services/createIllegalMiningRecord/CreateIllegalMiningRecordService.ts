import { inject, injectable } from 'tsyringe'

import { IExternalDatabaseProvider } from '@shared/providers/externalDatabaseProvider/interface/IExternalDatabaseProvider'
import { collectorLog } from '@shared/utils/log'

import { IIllegalMiningRepository } from '../../repositories/IIllegalMiningRepository'

@injectable()
export class CreateIllegalMiningRecordService {
  constructor(
    @inject('IllegalMiningRepository')
    private illegalMiningRepository: IIllegalMiningRepository,
    @inject('ExternalDatabaseProvider')
    private externalDatabaseProvider: IExternalDatabaseProvider
  ) {}

  async execute() {
    collectorLog('Inserting data for illegal mining info!')
    const records = await this.externalDatabaseProvider.getIllegalMiningInfo()
    collectorLog(records)
    await this.illegalMiningRepository.create(records)
  }
}
