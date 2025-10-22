// ormconfig.js
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  type: 'postgres',
  url: process.env.DATABASE_URL, // Heroku usa esto
  ssl: isProd ? { rejectUnauthorized: false } : false,
  synchronize: false,
  logging: false,

  entities: isProd
    ? ['dist/**/*.entity.js']
    : ['src/**/*.entity.ts'],

  migrations: isProd
    ? ['dist/migration/**/*.js']
    : ['src/migration/**/*.ts'],

  subscribers: isProd
    ? ['dist/subscriber/**/*.js']
    : ['src/subscriber/**/*.ts'],

  cli: {
    entitiesDir: 'src',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber'
  }
};
