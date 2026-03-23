/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('shopping_list').del();
  await knex('shopping_list').insert([
    {
      'item_name': 'Milk',
      'unit_type': 'Liters',
      'quantity': 2,
    },
    {
      'item_name': 'Bread',
      'unit_type': 'Pack',
      'quantity': 1,
    },
    {
      'item_name': 'Eggs',
      'unit_type': 'Box',
      'quantity': 1,
    },
    {
      'item_name': 'Rice',
      'unit_type': 'Kg',
      'quantity': 2,
    },
    {
      'item_name': 'Bananas',
      'unit_type': 'Unit',
      'quantity': 6,
    },
  ]);
};
