import { container } from 'tsyringe'

import { CreateHumanMercuryRecordService } from './CreateHumanMercuryRecordService'

export class CreateHumanMercuryRecordController {
  async start() {
    const createHumanMercuryRecordService = container.resolve(
      CreateHumanMercuryRecordService
    )
    await createHumanMercuryRecordService.execute()
  }
}
