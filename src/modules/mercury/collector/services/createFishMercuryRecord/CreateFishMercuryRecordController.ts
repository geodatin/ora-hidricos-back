import { container } from 'tsyringe'

import { CreateFishMercuryRecordService } from './CreateFishMercuryRecordService'

export class CreateFishMercuryRecordController {
  async start() {
    const createFishMercuryRecordService = container.resolve(
      CreateFishMercuryRecordService
    )
    await createFishMercuryRecordService.execute()
  }
}
