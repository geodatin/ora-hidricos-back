import { inject, injectable } from 'tsyringe'

import { IExternalDatabaseProvider } from '@shared/providers/externalDatabaseProvider/interface/IExternalDatabaseProvider'
import { collectorLog } from '@shared/utils/log'

import { IHumanMercuryRepository } from '../../repositories/IHumanMercuryRepository'

@injectable()
export class CreateHumanMercuryRecordService {
  constructor(
    @inject('HumanMercuryRepository')
    private humanMercuryRepository: IHumanMercuryRepository,
    @inject('ExternalDatabaseProvider')
    private externalDatabaseProvider: IExternalDatabaseProvider
  ) {}

  async execute() {
    collectorLog('Inserting data for human mercury info!')
    const records = await this.externalDatabaseProvider.getHumanMercuryInfo()
    await this.humanMercuryRepository.create(records)
  }
}
