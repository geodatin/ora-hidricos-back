import { container } from 'tsyringe'

import { CreateOilFieldRecordService } from './CreateOilFieldRecordService'

export class CreateOilFieldRecordController {
  async start() {
    const createOilFieldRecordService = container.resolve(
      CreateOilFieldRecordService
    )
    await createOilFieldRecordService.execute()
  }
}
