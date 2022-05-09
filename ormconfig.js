const production = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  schema: process.env.SCHEMA,
  synchronize: false,
  logging: true,
  entities: ['./build/modules/**/models/*.ts'],
  migrations: ['./build/database/migrations/*.ts'],
  cli: {
    entitiesDir: './build/modules/**/models/*.ts',
    migrationsDir: './build/database/migrations/*.ts',
  },
}

const development = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  schema: process.env.SCHEMA,
  synchronize: false,
  logging: false,
  entities: ['./src/modules/**/models/*.ts'],
  migrations: ['./src/shared/infrastructure/database/migrations/*.ts'],
  cli: {
    entitiesDir: './src/modules/**/models/*.ts',
    migrationsDir: './src/shared/infrastructure/database/migrations',
  },
}

module.exports =
  process.env.NODE_ENV === 'production' ? production : development
