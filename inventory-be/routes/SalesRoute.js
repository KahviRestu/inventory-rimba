const express = require('express');

const {
  saveSales,
  getSales,
  getSalesById,
  deleteSales,
} = require ('../controllers/SalesController')

const router = express.Router();

router.post('/sales', saveSales);
router.get('/sales', getSales);
router.delete('/sales/:salesId', deleteSales);
router.get('/sales/:salesId', getSalesById);

module.exports = router;