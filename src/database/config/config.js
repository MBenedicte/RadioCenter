require('dotenv').config()

module.exports = {
  development: {
    username: 'postgres',
    password: process.env.DB__API_PASSWORD,
    database: process.env.DB_API_DEV,
    host: '127.0.0.1',
    dialect: 'postgres',
    logging: false
  },
  test: {
    username: 'postgres',
    password: process.env.DB__API_PASSWORD,
    database: process.env.DB_API_TEST,
    host: '127.0.0.1',
    dialect: 'postgres',
    logging: false,
  },
  production: {
    username: process.env.DB_API_USER,
    password: process.env.DB_API_PASSWORD,
    database: process.env.DB_API_PRO,
    host: process.env.API_HOST,
    dialect: 'postgres',
    logging: false
  }
}
