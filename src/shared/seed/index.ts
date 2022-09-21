import 'reflect-metadata'

import { CreateFishMercuryRecordController } from '@modules/mercury/collector/services/createFishMercuryRecord/CreateFishMercuryRecordController'
import { CreateHumanMercuryRecordController } from '@modules/mercury/collector/services/createHumanMercuryRecord/CreateHumanMercuryRecordControler'

import '../providers'
import '../container'
import { CreateIllegalMiningRecordController } from '@modules/mining/collector/services/createIllegalMiningRecord/CreateIllegalMiningRecordController'
import { CreateMiningMineRecordController } from '@modules/mining/collector/services/createMiningMineRecord/CreateMiningMineRecordController'
import { CreateOilFieldRecordController } from '@modules/oil/collector/services/createOilFieldRecord/CreateOilFieldRecordController'
import { OrganicPollutionCollector } from '@modules/pollution/collectors/OrganicPollutionCollector'
import { PopulationCollector } from '@modules/population/collector/PopulationCollector'
import { FloodZoneCollector } from '@modules/soil/api/collector/FloodZoneCollector'
import { CreateDeforestationRecordController } from '@modules/soil/collector/services/createDeforestationRecord/CreateDeforestationRecordController'
import { HydroelectricCollector } from '@modules/waterResources/api/collector/HydroElectricCollector'
import { CreateWaterwayRecordController } from '@modules/waterResources/collector/services/createWaterwayRecord/CreateWaterwayRecordController'
import { createConnection } from 'typeorm'
import { AnaWaterUsersCollector } from '@modules/anaWaterUsers/collectors/AnaWaterUsersCollector'
import { HgcAspectsCollector } from '@modules/hgcAspects/collector/HgcAscpectsCollector'

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
  /*   const createDeforestationRecordController =
    new CreateDeforestationRecordController()
  await createDeforestationRecordController.start() */
  /*   const createWaterwayRecordController = new CreateWaterwayRecordController()
  await createWaterwayRecordController.start() */
  /*   const anaWaterUsersCollector = new AnaWaterUsersCollector()
  await anaWaterUsersCollector.execute() */
  /*   const organicPollutionCollector = new OrganicPollutionCollector()
  await organicPollutionCollector.execute() */
  /*   const floodZoneCollector = new FloodZoneCollector()
  await floodZoneCollector.execute() */
  /*   const hydroelectricCollector = new HydroelectricCollector()
  await hydroelectricCollector.execute() */
  /*   const populationCollector = new PopulationCollector()
  await populationCollector.execute() */
  const hgcAscpectsCollector = new HgcAspectsCollector()
  await hgcAscpectsCollector.execute()
})
