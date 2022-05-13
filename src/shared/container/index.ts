import { AmazonCityRepository } from '@modules/territory/infrastructure/typeorm/repositories/AmazonCityRepository'
import { AmazonCountryRepository } from '@modules/territory/infrastructure/typeorm/repositories/AmazonCountryRepository'
import { AmazonStateRepository } from '@modules/territory/infrastructure/typeorm/repositories/AmazonStateRepository'
import { IAmazonCityRepository } from '@modules/territory/repositories/IAmazonCityRepository'
import { IAmazonCountryRepository } from '@modules/territory/repositories/IAmazonCountryRepository'
import { IAmazonStateRepository } from '@modules/territory/repositories/IAmazonStateRepository'
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
