import { createFakeUser, createTableRows } from "../../utils/dbHelpers.js";

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

const million = 1000000;

export async function seed(knex) {
  const rows = createTableRows(10, createFakeUser())

  await knex('users').insert(rows);
};
