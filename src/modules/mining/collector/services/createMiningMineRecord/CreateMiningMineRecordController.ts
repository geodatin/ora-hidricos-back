import { container } from 'tsyringe'

import { CreateMiningMineRecordService } from './CreateMiningMineRecordService'

export class CreateMiningMineRecordController {
  async start() {
    const createMiningMineRecordService = container.resolve(
      CreateMiningMineRecordService
    )
    await createMiningMineRecordService.execute()
  }
}
