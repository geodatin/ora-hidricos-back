import { WaterUserStateRepository } from '@modules/anaWaterUsers/infrastructure/repositories/WaterUserStateRepository'
import { WaterUserUnionRepository } from '@modules/anaWaterUsers/infrastructure/repositories/WaterUserUnionRepository'
import { IWaterUserRepository } from '@modules/anaWaterUsers/repositories/IWaterUserRepository'
import { HgcAspectsRepository } from '@modules/hgcAspects/infrastructure/repositories/HgcAspectsRepoitory'
import { IHgcAspectsRepository } from '@modules/hgcAspects/repositories/IHgcAspectsRepository'
import { FishMercuryRepositoryApi } from '@modules/mercury/api/infrastructure/repositories/FishMercuryRepositoryApi'
import { HumanMercuryRepositoryApi } from '@modules/mercury/api/infrastructure/repositories/HumanMercuryRepositoryApi'
import { IFishMercuryRepositoryApi } from '@modules/mercury/api/repositories/IFishMercuryRepositoryApi'
import { IHumanMercuryRepositoryApi } from '@modules/mercury/api/repositories/IHumanMercuryRepositoryApi'
import { FishMercuryRepository } from '@modules/mercury/collector/infrastructure/repositories/FishMercuryRepository'
import { HumanMercuryRepository } from '@modules/mercury/collector/infrastructure/repositories/HumanMercuryRepository'
import { IFishMercuryRepository } from '@modules/mercury/collector/repositories/IFishMercuryRepository'
import { IHumanMercuryRepository } from '@modules/mercury/collector/repositories/IHumanMercuryRepository'
import { IllegalMiningRepositoryApi } from '@modules/mining/api/infrastructure/repositories/IllegalMiningRepositoryApi'
import { MiningMineRepositoryApi } from '@modules/mining/api/infrastructure/repositories/MiningMineRepositoryApi'
import { IIllegalMiningRepositoryApi } from '@modules/mining/api/repositories/IIllegalMiningRepositoryApi'
import { IMiningMineRepositoryApi } from '@modules/mining/api/repositories/IMiningMineRepositoryApi'
import { IllegalMiningRepository } from '@modules/mining/collector/infrastructure/repositories/IllegalMiningRepository'
import { MiningMineRepository } from '@modules/mining/collector/infrastructure/repositories/MiningMineRepository'
import { IIllegalMiningRepository } from '@modules/mining/collector/repositories/IIllegalMiningRepository'
import { IMiningMineRepository } from '@modules/mining/collector/repositories/IMiningMineRepository'
import { OilFieldRepositoryApi } from '@modules/oil/api/infrastructure/repositories/OilFieldRepositoryApi'
import { IOilFieldRepositoryApi } from '@modules/oil/api/repositories/IOilFieldRepositoryApi'
import { OilFieldRepository } from '@modules/oil/collector/infrastructure/repositories/OilFieldRepository'
import { IOilFieldRepository } from '@modules/oil/collector/repositories/IOilFieldRepository'
import { OrganicPollutionRepository } from '@modules/pollution/infrastructure/repositories/OrganicPollutionRepository'
import { IOrganicPollutionRepository } from '@modules/pollution/repositories/IOrganicPollutionRepository'
import { PopulationRepository } from '@modules/population/infrastructure/repositories/PopulationRepoitory'
import { IPopulationRepository } from '@modules/population/repositories/IPopulationRepository'
import { FloodZoneRepository } from '@modules/soil/api/infrastructure/repositories/FloodZoneRepository'
import { IFloodZoneRepository } from '@modules/soil/api/repositories/IFloodZoneRepository'
import { DeforestationRepository } from '@modules/soil/collector/infrastructure/repositories/DeforestationRepository'
import { IDeforestationRepository } from '@modules/soil/collector/repositories/IDeforestationRepository'
import { AmazonCityRepository } from '@modules/territory/infrastructure/typeorm/repositories/AmazonCityRepository'
import { AmazonCountryRepository } from '@modules/territory/infrastructure/typeorm/repositories/AmazonCountryRepository'
import { AmazonStateRepository } from '@modules/territory/infrastructure/typeorm/repositories/AmazonStateRepository'
import { IAmazonCityRepository } from '@modules/territory/repositories/IAmazonCityRepository'
import { IAmazonCountryRepository } from '@modules/territory/repositories/IAmazonCountryRepository'
import { IAmazonStateRepository } from '@modules/territory/repositories/IAmazonStateRepository'
import { HydroelectricRepository } from '@modules/waterResources/api/infrastructure/repositories/HydroelectricRepository'
import { WaterwayRepositoryApi } from '@modules/waterResources/api/infrastructure/repositories/WaterwayRepository'
import { IHydroelectricRepository } from '@modules/waterResources/api/repositories/IHydroelectricRepository'
import { IWaterwayRepositoryApi } from '@modules/waterResources/api/repositories/IWatewayRepositoryApi'
import { WaterwayRepository } from '@modules/waterResources/collector/infrastructure/repositories/WaterwayRepository'
import { IWaterwayRepository } from '@modules/waterResources/collector/repositories/IWaterwayRepository'
import { WaterSurfaceCityAnnualRepository } from '@modules/waterSurface/infrastructure/typeorm/repositories/WaterSurfaceCityAnnualRepository'
import { WaterSurfaceCountryAnnualRepository } from '@modules/waterSurface/infrastructure/typeorm/repositories/WaterSurfaceCountryAnnualRepository'
import { WaterSurfaceStateAnnualRepository } from '@modules/waterSurface/infrastructure/typeorm/repositories/WaterSurfaceStateAnnualRepository'
import { IWaterSurfaceRepository } from '@modules/waterSurface/repositories/IWaterSurfaceRepository'
import { container } from 'tsyringe'

container.registerSingleton<IAmazonCityRepository>(
  'AmazonCityRepository',
  AmazonCityRepository
)

container.registerSingleton<IAmazonCountryRepository>(
  'AmazonCountryRepository',
  AmazonCountryRepository
)

container.registerSingleton<IAmazonStateRepository>(
  'AmazonStateRepository',
  AmazonStateRepository
)

container.registerSingleton<IWaterSurfaceRepository>(
  'WaterSurfaceCityAnnualRepository',
  WaterSurfaceCityAnnualRepository
)

container.registerSingleton<IWaterSurfaceRepository>(
  'WaterSurfaceStateAnnualRepository',
  WaterSurfaceStateAnnualRepository
)

container.registerSingleton<IWaterSurfaceRepository>(
  'WaterSurfaceCountryAnnualRepository',
  WaterSurfaceCountryAnnualRepository
)

container.registerSingleton<IHumanMercuryRepository>(
  'HumanMercuryRepository',
  HumanMercuryRepository
)

container.registerSingleton<IFishMercuryRepository>(
  'FishMercuryRepository',
  FishMercuryRepository
)

container.registerSingleton<IHumanMercuryRepositoryApi>(
  'HumanMercuryRepositoryApi',
  HumanMercuryRepositoryApi
)

container.registerSingleton<IFishMercuryRepositoryApi>(
  'FishMercuryRepositoryApi',
  FishMercuryRepositoryApi
)

container.registerSingleton<IIllegalMiningRepository>(
  'IllegalMiningRepository',
  IllegalMiningRepository
)

container.registerSingleton<IOilFieldRepository>(
  'OilFieldRepository',
  OilFieldRepository
)

container.registerSingleton<IMiningMineRepository>(
  'MiningMineRepository',
  MiningMineRepository
)

container.registerSingleton<IDeforestationRepository>(
  'DeforestationRepository',
  DeforestationRepository
)

container.registerSingleton<IWaterwayRepository>(
  'WaterwayRepository',
  WaterwayRepository
)

container.registerSingleton<IOilFieldRepositoryApi>(
  'OilFieldRepositoryApi',
  OilFieldRepositoryApi
)

container.registerSingleton<IIllegalMiningRepositoryApi>(
  'IllegalMiningRepositoryApi',
  IllegalMiningRepositoryApi
)

container.registerSingleton<IMiningMineRepositoryApi>(
  'MiningMineRepositoryApi',
  MiningMineRepositoryApi
)

container.registerSingleton<IWaterwayRepositoryApi>(
  'WaterwayRepositoryApi',
  WaterwayRepositoryApi
)

container.registerSingleton<IOrganicPollutionRepository>(
  'OrganicPollutionRepository',
  OrganicPollutionRepository
)

container.registerSingleton<IWaterUserRepository>(
  'WaterUserStateRepository',
  WaterUserStateRepository
)

container.registerSingleton<IWaterUserRepository>(
  'WaterUserUnionRepository',
  WaterUserUnionRepository
)

container.registerSingleton<IFloodZoneRepository>(
  'FloodZoneRepository',
  FloodZoneRepository
)

container.registerSingleton<IHydroelectricRepository>(
  'HydroelectricRepository',
  HydroelectricRepository
)

container.registerSingleton<IPopulationRepository>(
  'PopulationRepository',
  PopulationRepository
)

container.registerSingleton<IHgcAspectsRepository>(
  'HgcAspectsRepository',
  HgcAspectsRepository
)
