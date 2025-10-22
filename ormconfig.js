// ormconfig.js
const hasDbUrl = !!process.env.DATABASE_URL;
// usa SSL si estás en Heroku (tienes DATABASE_URL) o si NODE_ENV=production
const useSsl = hasDbUrl || process.env.NODE_ENV === 'production';

module.exports = {
  type: 'postgres',
  // en Heroku usas DATABASE_URL; si no existe, falla explícito (así no intenta 127.0.0.1)
  ...(hasDbUrl
    ? { url: process.env.DATABASE_URL }
    : (() => { throw new Error('DATABASE_URL is not set'); })()),

  ssl: useSsl ? { rejectUnauthorized: false } : false,
  synchronize: false,
  logging: false,

  // si tus entidades terminan en .entity.ts/.js usa estos patrones; si no, cambia a 'dist/**/*.js' / 'src/**/*.ts'
  entities: process.env.NODE_ENV === 'production'
    ? ['dist/**/*.entity.js']
    : ['src/**/*.entity.ts'],

  migrations: process.env.NODE_ENV === 'production'
    ? ['dist/migration/**/*.js']
    : ['src/migration/**/*.ts'],

  subscribers: process.env.NODE_ENV === 'production'
    ? ['dist/subscriber/**/*.js']
    : ['src/subscriber/**/*.ts'],

  cli: {
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  },
};
