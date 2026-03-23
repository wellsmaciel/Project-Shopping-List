/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('shopping_list', function (table) {
    table.increments('id').primary();
    table.string('item_name', 100).notNullable();
    table.string('unit_type').notNullable();
    table.integer('quantity').notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('shopping_list');
};
