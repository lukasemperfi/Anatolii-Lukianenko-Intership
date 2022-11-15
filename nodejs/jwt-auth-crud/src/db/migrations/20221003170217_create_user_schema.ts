import { Knex } from "knex";

export const up = async (knex: Knex): Promise<void> =>
  await knex.schema.createTable("user", (table) => {
    table.increments().primary();
    table.string("email", 255).notNullable().unique();
    table.string("password", 255).notNullable();
  });

export const down = async (knex: Knex): Promise<void> =>
  await knex.schema.dropTableIfExists("user");
