const sharedMigrations = {
  tableName: 'knex_migrations',
  directory: './db/migrations',
};

const sharedSeeds = {
  directory: './db/seeds',
};

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './db/dev.sqlite3',
    },
    migrations: sharedMigrations,
    seeds: sharedSeeds,
    useNullAsDefault: true,
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
      ? {
          connectionString: process.env.DATABASE_URL,
          ssl: { rejectUnauthorized: false },
        }
      : undefined,
    migrations: sharedMigrations,
    seeds: sharedSeeds,
    pool: {
      min: 2,
      max: 10,
    },
  },
};
