const baseConfig = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  schema: process.env.SCHEMA,
  synchronize: false,
  logging: true,
  entities: ['./src/modules/**/models/*.ts'],
  migrations: ['./src/shared/infrastructure/database/migrations/*.ts'],
  cli: {
    entitiesDir: './src/modules/**/models/*.ts',
    migrationsDir: './src/shared/infrastructure/database/migrations',
  },
}

const environments = {
  development: baseConfig,
  production: {
    ...baseConfig,
    entities: ['./build/modules/**/models/*.js'],
    migrations: ['./src/shared/infrastructure/database/migrations/*.js'],
    logging: false,
  },
  test: { ...baseConfig, logging: false },
}

module.exports = environments[process.env.NODE_ENV]
