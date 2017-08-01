const express = require('express');

const accountService = require('../services/AccountService')

const app = express.Router();

app.get("/me", (req, res) => {

  const token = req.session.token;

  if(!token) {
    res.status(401).send();
  }

  accountService.findAccount(token)
    .then((data) => {
      res.send(data)
    })
    .catch(() => {
      res.status(404).send("Account not found")
    })

})


module.exports = app