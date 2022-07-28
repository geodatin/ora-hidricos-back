import { container } from 'tsyringe'

import { CreateIllegalMiningRecordService } from './CreateIllegalMiningRecordService'

export class CreateIllegalMiningRecordController {
  async start() {
    const createIllegalMiningRecordService = container.resolve(
      CreateIllegalMiningRecordService
    )
    await createIllegalMiningRecordService.execute()
  }
}
