const express = require('express');

const expressSession = require('express-session');
const bodyParser = require('body-parser');

const authService = require('../services/AuthService')

const app = express.Router();

app.use(bodyParser.json())

app.post("/login", (req, res) => {

  const username = req.body.username;
  const password = req.body.password;

  authService.authenticate(username, password)
    .then((data) => {
      req.session.token = data.token;
      res.send(data)
    })
    .catch((e) => {
      res.status(400).send(e.message)
    })

})

app.post("/logout", (req, res) => {
  req.session.token = null;
  res.status(204);
  res.send()
})


module.exports = app