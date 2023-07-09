const express = require('express');

const {
  getCustomer,
  getCustomerById,
  saveCustomer,
  updateCustomer,
  deleteCustomer
} = require('../controllers/CustomerController')

const router = express.Router();

router.get('/customer', getCustomer);
router.get('/customer/:customerId', getCustomerById);
router.post('/customer', saveCustomer);
router.patch('/customer/:customerId', updateCustomer);
router.delete('/customer/:customerId', deleteCustomer);

module.exports = router;