var express = require('express');
var apiShoplistv2 = express.Router();

/*let shoplist = [
  {
    id: 1,
    name: 'Leite',
    price: 3.5,
  },
  {
    id: 2,
    name: 'Pão',
    price: 2.0,
  },
  {
    id: 3,
    name: 'Ovos',
    price: 5.0,
  },
];*/

const knex = require('knex')(require('../knexfile').development);

apiShoplistv2.get('/shopping_list', function (req, res, next) {
  knex('shopping_list')
    .select('*')
    .then((shopping_list) => {
      res.status(200).json(shopping_list);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Failed to retrieve shopping list' });
    });
});

/* GET item by ID. */
apiShoplistv2.get('/shopping_list/:id', function (req, res, next) {
  let id = parseInt(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({ error: 'Invalid item ID. It should be a number' });
  }

  knex('shopping_list')
    .where({ id: id })
    .first()
    .then((item) => {
      if (!item) {
        return res.status(404).json({ error: 'Item not found' });
      }

      res.status(200).json(item);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Failed to retrieve item' });
    });
});

/* POST new item. */
apiShoplistv2.post('/shopping_list', function (req, res, next) {
  let { item_name, unit_type, quantity } = req.body;
  quantity = Number(quantity);

  if (!item_name || typeof item_name !== 'string' || Number.isNaN(quantity) || quantity <= 0) {
    return res.status(400).json({
      error: 'Item name and quantity are required. Item name must be text and quantity must be a positive number',
    });
  } else if (!unit_type || typeof unit_type !== 'string') {
    return res.status(400).json({
      error: 'unit_type is required and must be text',
    });
  }

  knex('shopping_list')
    .insert({ item_name, unit_type, quantity })
    .then((ids) => {
      const id = ids[0]; // Get the ID of the newly inserted item

      res.status(201).json({
        message: 'Item added successfully',
        item: { id, item_name, unit_type, quantity },
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Failed to create item' });
    });
});

//* DELETE item by ID. */
apiShoplistv2.delete('/shopping_list/:id', function (req, res, next) {
  let id = parseInt(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({ error: 'Invalid item ID. It should be a number' });
  }

  knex('shopping_list')
    .where({ id: id })
    .del()
    .then((deletedRows) => {
      if (deletedRows === 0) {
        return res.status(404).json({ error: 'Item not found' });
      }

      res.status(200).json({ message: 'Item deleted successfully', id: id });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Failed to delete item' });
    });
});

//* PUT item by ID. */
apiShoplistv2.put('/shopping_list/:id', function (req, res, next) {
  let id = parseInt(req.params.id);
  let { item_name, unit_type, quantity } = req.body;
  quantity = Number(quantity);
  if (Number.isNaN(id)) {
    return res.status(400).json({ error: 'Invalid item ID. It should be a number' });
  }

  if (!item_name || typeof item_name !== 'string' || Number.isNaN(quantity) || quantity <= 0) {
    return res.status(400).json({
      error: 'Item name and quantity are required. Item name must be text and quantity must be a positive number',
    });
  } else if (!unit_type || typeof unit_type !== 'string') {
    return res.status(400).json({
      error: 'unit_type is required and must be text',
    });
  }

  knex('shopping_list')
    .where({ id: id })
    .update({ item_name, unit_type, quantity })
    .then((updatedRows) => {
      if (updatedRows === 0) {
        return res.status(404).json({ error: 'Item not found' });
      }

      res.status(200).json({ message: 'Item updated successfully', item: { id, item_name, unit_type, quantity } });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Failed to update item' });
    });
});

module.exports = apiShoplistv2;
