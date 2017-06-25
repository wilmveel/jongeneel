const express = require('express');

const accountService = require('../services/AccountService')

const app = express.Router();

app.get("/me", (req, res) => {
  accountService.findAccount()
    .then((data) => {
      res.send(data)
    })
    .catch(() => {
      res.status(404);
      res.send("Product not found")
    })

})


module.exports = app