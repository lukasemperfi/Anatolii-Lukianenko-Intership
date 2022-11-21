export const up = async (knex) =>
  await knex.schema.createTable("task", (table) => {
    table.increments().primary();
    table.string("title");
    table.boolean("completed").defaultTo(false);
    table.integer("user_id").unsigned().notNullable();
    table.foreign("user_id").references("id").inTable("users");
  });

export const down = async (knex) => await knex.schema.dropTableIfExists("task");
