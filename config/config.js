require('dotenv').config();

module.exports = {
  "development": {
    "username": process.env.PLOGIN,
    "password": process.env.PPASSWORD,
    "database": "database_development",
    "host": "127.0.0.1",
    "port": process.env.PORT_POSTGRES,
    "dialect": "postgres"
  },
  "test": {
    "username": process.env.PLOGIN,
    "password": process.env.PPASSWORD,
    "database": "database_test",
    "host": "127.0.0.1",
    "port": process.env.PORT_POSTGRES,
    "dialect": "postgres"
  },
  "production": {
    use_env_variable: "DATABASE_URL",
    dialectOptions: {
      ssl: { rejectUnauthorized: false },
    },
  }
}