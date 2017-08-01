const express = require('express');

const cartService = require('../services/CartService')

const app = express.Router();

app.get("", (req, res) => {

  const token = req.session.token;

  if(!token) {
    return res.status(401).send();
  }

  return cartService.findAll(token)
    .then((data) => {
      res.send(data)
    })
    .catch((e) => {
      res.status(404).send("Cart not found")
    })

});

module.exports = app