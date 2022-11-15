const { knexSnakeCaseMappers } = require("objection");

require("dotenv").config({ path: "../.env" });

module.exports = {
  development: {
    client: "mysql",
    connection: {
      host: process.env.MYSQL_HOST || "mysql",
      port: process.env.MYSQL_PORT || 3306,
      user: process.env.MYSQL_USER || "root",
      password: process.env.MYSQL_PASSWORD || "password",
      database: process.env.MYSQL_DB || "admin",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
    ...knexSnakeCaseMappers,
  },
};
