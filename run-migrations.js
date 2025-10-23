const { createConnection, getConnectionOptions } = require('typeorm');

(async () => {
  try {
    const options = await getConnectionOptions();
    const conn = await createConnection(Object.assign(options, { migrationsRun: true }));
    console.log('Migrations executed (if any)');
    await conn.close();
    process.exit(0);
  } catch (err) {
    console.error('Failed to run migrations:', err);
    process.exit(1);
  }
})();
