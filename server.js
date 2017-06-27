const express = require('express');

const port = process.env.PORT || 3000;

const username = "barzijd";
const password ="AvD!9841";

const app = express();

app.use('/api/accounts', require('./api/AccountsApi'));
app.use('/api/products', require('./api/ProductApi'));

app.use('/images', express.static('images'));

app.use('/components', express.static('components'));
app.use('/components', express.static('bower_components'));

app.use("/index.html", express.static(__dirname + '/index.html'));

app.listen(port, function () {
  console.log(`Example app listening on port ${port}`)
})

