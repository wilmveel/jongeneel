const express = require('express');

const productService = require('../services/ProductService')

const app = express.Router();

app.get("", (req, res) => {
  const q = req.query.q;
  productService.findProductsBySearch(q)
    .then((data) => {
      res.send(data)
    })
    .catch(() => {
      res.status(404);
      res.send("Product not found")
    })

})

app.get("/:id", (req, res) => {
  const id = req.params.id;
  productService.findProductById(id)
    .then((data) => {
      res.send(data)
    })
    .catch(() => {
      res.status(404);
      res.send("Product not found")
    })

})


module.exports = app