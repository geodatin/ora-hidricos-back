import { container } from 'tsyringe'

import { CreateWaterwayRecordService } from './CreateWaterwayRecordService'

export class CreateWaterwayRecordController {
  async start() {
    const createWaterwayRecordService = container.resolve(
      CreateWaterwayRecordService
    )
    await createWaterwayRecordService.execute()
  }
}
