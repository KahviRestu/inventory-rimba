const express = require('express');
const FileUpload = require("express-fileupload");
const cors = require("cors");

const router = require("./routes/index.js");

// import ItemRoute from './routes/ItemRoute.js';
// import CustomerRoute from './routes/CustomerRoute.js';
// import SalesRoute from './routes/SalesRoute.js'

const app = express();

app.use(cors());
app.use(express.json());
app.use(FileUpload());
app.use(express.static("public"));
app.use(router);
// app.use(CustomerRoute);
// app.use(SalesRoute);

app.listen(5000, ()=> console.log('Server Running...'));