const express = require('express');

const cartService = require('../services/CartService')

const app = express.Router();

app.get("/current", (req, res) => {

  const token = req.session.token;

  if(!token) {
    res.status(401).send();
  }

  cartService.findAll(token)
    .then((data) => {
      res.send(data)
    })
    .catch((e) => {
      res.status(404).send("Cart not found")
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