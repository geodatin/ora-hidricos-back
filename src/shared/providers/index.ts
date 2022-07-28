import { container } from 'tsyringe'

import { PgExtDatabaseProvider } from './externalDatabaseProvider/implementations/PgExtDatabaseProvider'
import { IExternalDatabaseProvider } from './externalDatabaseProvider/interface/IExternalDatabaseProvider'

container.registerSingleton<IExternalDatabaseProvider>(
  'ExternalDatabaseProvider',
  PgExtDatabaseProvider
)
