const express = require('express');
const router = express.Router();
const nano = require('nano')('http://admin:YOURPASSWORD@localhost:5984'); // Ersetze YOURPASSWORD durch dein CouchDB-Passwort

const db = nano.use('orders');

// Route to get all orders
router.get('/', async (req, res) => {
  try {
    const response = await db.list({ include_docs: true });
    res.json(response.rows.map(row => row.doc));
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Route to add a new order
router.post('/', async (req, res) => {
  try {
    const order = req.body;
    const response = await db.insert(order);
    res.json(response);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Route to update an order
router.put('/:id', async (req, res) => {
  try {
    const order = req.body;
    order._id = req.params.id;
    order._rev = (await db.get(req.params.id))._rev; // Get the latest revision
    const response = await db.insert(order);
    res.json(response);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
