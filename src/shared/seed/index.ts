import 'reflect-metadata'

import { CreateFishMercuryRecordController } from '@modules/mercury/collector/services/createFishMercuryRecord/CreateFishMercuryRecordController'
import { CreateHumanMercuryRecordController } from '@modules/mercury/collector/services/createHumanMercuryRecord/CreateHumanMercuryRecordControler'

import '../providers'
import '../container'
import { CreateIllegalMiningRecordController } from '@modules/mining/collector/services/createIllegalMiningRecord/CreateIllegalMiningRecordController'
import { CreateMiningMineRecordController } from '@modules/mining/collector/services/createMiningMineRecord/CreateMiningMineRecordController'
import { CreateOilFieldRecordController } from '@modules/oil/collector/services/createOilFieldRecord/CreateOilFieldRecordController'
import { CreateDeforestationRecordController } from '@modules/soil/collector/services/createDeforestationRecord/CreateDeforestationRecordController'
import { createConnection } from 'typeorm'

createConnection().then(async (connection) => {
  /*   const createHumanMercuryRecordController =
    new CreateHumanMercuryRecordController()
  await createHumanMercuryRecordController.start()

  const createFishMercuryRecordController =
    new CreateFishMercuryRecordController()
  await createFishMercuryRecordController.start() */

  /*   const createIllegalMiningRecordController =
    new CreateIllegalMiningRecordController()
  await createIllegalMiningRecordController.start() */

  /*   const createOilFieldRecordController = new CreateOilFieldRecordController()
  await createOilFieldRecordController.start() */

  /*   const createMiningMineRecordController =
    new CreateMiningMineRecordController()
  await createMiningMineRecordController.start() */

  const createDeforestationRecordController =
    new CreateDeforestationRecordController()
  await createDeforestationRecordController.start()
})
