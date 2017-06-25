const express = require('express');

const port = process.env.PORT || 3000;

const username = "barzijd";
const password ="AvD!9841";

const app = express();

app.use('/products', require('./api/ProductApi'))

app.listen(port, function () {
  console.log(`Example app listening on port ${port}`)
})

