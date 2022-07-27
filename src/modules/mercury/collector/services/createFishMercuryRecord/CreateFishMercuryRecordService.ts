import { inject, injectable } from 'tsyringe'

import { IExternalDatabaseProvider } from '@shared/providers/externalDatabaseProvider/interface/IExternalDatabaseProvider'
import { collectorLog } from '@shared/utils/log'

import { IFishMercuryRepository } from '../../repositories/IFishMercuryRepository'

@injectable()
export class CreateFishMercuryRecordService {
  constructor(
    @inject('FishMercuryRepository')
    private fishMercuryRepository: IFishMercuryRepository,
    @inject('ExternalDatabaseProvider')
    private externalDatabaseProvider: IExternalDatabaseProvider
  ) {}

  async execute() {
    collectorLog('Inserting data for fish mercury info!')
    const records = await this.externalDatabaseProvider.getFishMercuryInfo()
    await this.fishMercuryRepository.create(records)
  }
}
