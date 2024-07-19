const express = require('express');
const router = express.Router();
const nano = require('nano')('http://admin:YOURPASSWORD@localhost:5984'); // Ersetze YOURPASSWORD durch dein CouchDB-Passwort

const db = nano.use('cocktails');

// Route to get all cocktails
router.get('/', async (req, res) => {
  try {
    const response = await db.list({ include_docs: true });
    res.json(response.rows.map(row => row.doc));
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Route to add a new cocktail
router.post('/', async (req, res) => {
  try {
    const cocktail = req.body;
    const response = await db.insert(cocktail);
    res.json(response);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Route to update a cocktail
router.put('/:id', async (req, res) => {
  try {
    const cocktail = req.body;
    cocktail._id = req.params.id;
    cocktail._rev = (await db.get(req.params.id))._rev; // Get the latest revision
    const response = await db.insert(cocktail);
    res.json(response);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Route to delete a cocktail
router.delete('/:id', async (req, res) => {
  try {
    const cocktail = await db.get(req.params.id);
    const response = await db.destroy(cocktail._id, cocktail._rev);
    res.json(response);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
