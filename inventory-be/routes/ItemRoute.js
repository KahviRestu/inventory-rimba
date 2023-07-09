const express = require('express');

const {
  getItem,
  getItemById,
  saveItem,
  updateItem,
  deleteItem,
} = require ('../controllers/ItemController')

const router = express.Router();

router.get('/item', getItem);
router.get('/item/:itemId', getItemById);
router.post('/item', saveItem);
router.patch('/item/:itemId', updateItem);
router.delete('/item/:itemId', deleteItem);

module.exports = router;