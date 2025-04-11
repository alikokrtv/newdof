const express = require('express');
const router = express.Router();
const { getItems, addItem } = require('../controllers/index');

// Route to get items
router.get('/items', getItems);

// Route to add an item
router.post('/items', addItem);

module.exports = router;