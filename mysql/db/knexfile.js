import * as dotenv from "dotenv";

dotenv.config();
// { path: "../.env" }
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

export const development = {
  client: "mysql",
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
  migrations: {
    tableName: "knex_migrations",
  },
  seeds: {
    directory: "./seeds",
  },
};
