const knex = require('knex');
const knexConfig = require('../knexfile');

const environment = process.env.NODE_ENV === 'production' ? 'production' : 'development';
const config = knexConfig[environment];

if (environment === 'production' && !process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is required when NODE_ENV=production');
}

module.exports = knex(config);
