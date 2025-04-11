const express = require('express');
const router = express.Router();
const { getItems, addItem } = require('../controllers/index');

// Define routes
router.get('/items', getItems);
router.post('/items', addItem);

// Export the router
module.exports = router;