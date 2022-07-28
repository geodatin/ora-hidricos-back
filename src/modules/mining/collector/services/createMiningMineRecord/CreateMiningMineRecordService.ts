import { inject, injectable } from 'tsyringe'

import { IExternalDatabaseProvider } from '@shared/providers/externalDatabaseProvider/interface/IExternalDatabaseProvider'
import { collectorLog } from '@shared/utils/log'
import { splitArray } from '@shared/utils/splitArray'

import { IMiningMineRepository } from '../../repositories/IMiningMineRepository'

@injectable()
export class CreateMiningMineRecordService {
  constructor(
    @inject('MiningMineRepository')
    private miningMineRepository: IMiningMineRepository,
    @inject('ExternalDatabaseProvider')
    private externalDatabaseProvider: IExternalDatabaseProvider
  ) {}

  async execute() {
    collectorLog('Inserting data for mining mine info!')
    const records = await this.externalDatabaseProvider.getMiningMineInfo()
    collectorLog(records)
    const splittedArray = splitArray(records, 1000)
    for (const array of splittedArray) {
      await this.miningMineRepository.create(array)
    }
  }
}
