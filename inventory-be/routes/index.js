const express = require("express");

const router = express.Router();

const ItemRoute = require('./ItemRoute');
const CustomerRoute = require('./CustomerRoute');
const SalesRoute = require('./SalesRoute');

//Routes
router.use(ItemRoute, CustomerRoute, SalesRoute);

module.exports = router;