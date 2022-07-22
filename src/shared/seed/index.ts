import 'reflect-metadata'

import { CreateFishMercuryRecordController } from '@modules/waterResources/collector/services/createFishMercuryRecord/CreateFishMercuryRecordController'
import { CreateHumanMercuryRecordController } from '@modules/waterResources/collector/services/createHumanMercuryRecord/CreateHumanMercuryRecordControler'
import { createConnection } from 'typeorm'

import '../providers'
import '../container'

createConnection().then(async (connection) => {
  const createHumanMercuryRecordController =
    new CreateHumanMercuryRecordController()
  await createHumanMercuryRecordController.start()

  const createFishMercuryRecordController =
    new CreateFishMercuryRecordController()
  await createFishMercuryRecordController.start()
})
