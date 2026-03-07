var express = require('express');
var apiShoplistv1 = express.Router();

let shoplist = [
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
];

/* GET home page. */
apiShoplistv1.get('/itens', function (req, res, next) {
  res.json(shoplist);
});

/* GET item by ID. */
apiShoplistv1.get('/itens/:id', function (req, res, next) {
  let id = parseInt(req.params.id);
  let item = shoplist.find((i) => i.id == id);
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ error: 'Item not found' });
  }
});

/* POST new item. */
apiShoplistv1.post('/itens', function (req, res, next) {
  let newItemData = req.body;
  if (!newItemData.name || !newItemData.price) {
    return res.status(400).json({
      error: 'name and or price is missing. They are required',
    });
  } else {
    newItemData.id = shoplist.length + 1;
    shoplist.push(newItemData);
    res.status(201).json({
      message: 'Item added successfully',
      item: newItemData,
    });
  }
});

//* DELETE item by ID. */
apiShoplistv1.delete('/itens/:id', function (req, res, next) {
  let id = parseInt(req.params.id);
  let item = shoplist.find((i) => i.id === id);
  if (Number.isNaN(id)) {
    res.status(400).json({ error: 'Item is invalid' });
  } else if (!item) {
    res.status(404).json({ error: 'The id ' + id + ' not found' });
  } else {
    shoplist.splice(shoplist.indexOf(item), 1);
    res.status(200).json({ message: 'Item deleted successfully' });
  }
});

//* PUT item by ID. */
apiShoplistv1.put('/itens/:id', function (req, res, next) {
  let bodyData = req.body;
  let id = parseInt(req.params.id);
  let item = shoplist.find((i) => i.id === id);
  if (Number.isNaN(id)) {
    res.status(400).json({ error: 'Invalid item ID. It should be a number' });
  } else if (!item) {
    res.status(404).json({ error: 'Item with ID ' + id + ' not found' });
  } else if (!bodyData.name || typeof bodyData.name !== 'string' || bodyData.price === undefined || bodyData.price <= 0 || typeof bodyData.price !== 'number') {
    res.status(400).json({
      error: 'name and price are required and must be valid(Name should be a string and Price should be a positive number)',
      bodyData: bodyData,
    });
  } else {
    item.name = bodyData.name;
    item.price = bodyData.price;
    res.status(200).json({ message: 'Item updated successfully', item: item });
  }
});

module.exports = apiShoplistv1;
