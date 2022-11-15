import { Knex } from "knex";

export const up = async (knex: Knex): Promise<void> =>
  await knex.schema.createTable("token", (table) => {
    table.increments().primary();
    table.string("refreshToken", 255).notNullable();
    table.integer("user_id").unsigned().notNullable();
    table.foreign("user_id").references("id").inTable("user");
  });

export const down = async (knex: Knex): Promise<void> =>
  await knex.schema.dropTableIfExists("token");
