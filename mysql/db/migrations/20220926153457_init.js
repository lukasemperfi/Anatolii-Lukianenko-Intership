export function up(knex) {
    return knex
        .schema
        .createTable('users', function (table) {
            table.increments('id');
            table.string('name', 255).notNullable();
            table.string('email', 255);
            table.integer('age');
        });
}

export function down(knex) {
    return knex.schema
        .dropTable('users');
}
