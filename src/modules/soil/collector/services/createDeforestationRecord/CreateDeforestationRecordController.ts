import { container } from 'tsyringe'

import { CreateDeforestationRecordService } from './CreateDeforestationRecordService'

export class CreateDeforestationRecordController {
  async start() {
    const createDeforestationRecordService = container.resolve(
      CreateDeforestationRecordService
    )
    await createDeforestationRecordService.execute()
  }
}
