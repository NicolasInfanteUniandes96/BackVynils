// ormconfig.js
// Compatible CommonJS que soporta Node sin features modernos (evita object spread {...})
var hasDbUrl = !!process.env.DATABASE_URL;
// usa SSL si estás en Heroku (tienes DATABASE_URL) o si NODE_ENV=production
var useSsl = hasDbUrl || process.env.NODE_ENV === 'production';

var fs = require('fs');
var hasDist = false;
try { hasDist = fs.existsSync(__dirname + '/dist'); } catch (e) { hasDist = false; }

var isProd = process.env.NODE_ENV === 'production' || hasDist;

var common = {
  type: 'postgres',
  // en desarrollo queremos que TypeORM sincronice el esquema para evitar errores de tablas faltantes
  // en producción preferimos ejecutar las migraciones (migrationsRun=true)
  synchronize: !isProd,
  logging: false,
  entities: isProd ? ['dist/**/*.entity.js'] : ['src/**/*.entity.ts'],
  migrations: isProd ? ['dist/migration/**/*.js'] : ['src/migration/**/*.ts'],
  subscribers: isProd ? ['dist/subscriber/**/*.js'] : ['src/subscriber/**/*.ts'],
  // si estamos en prod o tenemos DATABASE_URL, ejecutar migraciones automáticamente
  migrationsRun: (isProd || hasDbUrl) === true,
  cli: {
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber'
  }
};

if (hasDbUrl) {
  module.exports = {
    type: 'postgres',
    url: process.env.DATABASE_URL,
    extra: {
      ssl: {
        rejectUnauthorized: false
      }
    }
  };
  // merge common properties
  Object.keys(common).forEach(function (k) { module.exports[k] = common[k]; });
} else {
  // fallback local DB (development)
  module.exports = {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || 'postgres',
    database: process.env.DB_NAME || 'vinyls'
  };
  // merge common properties
  Object.keys(common).forEach(function (k) { module.exports[k] = common[k]; });
}

