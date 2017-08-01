const express = require('express');

const facetService = require('../services/FacetService')

const app = express.Router();

app.get("", (req, res) => {

  if(!req.query.q)
    res.status(400).send("No search term found");

  const opts = {
    q: req.query.q
  };

  facetService.findFacetsBySearchTerm(opts)
    .then((data) => {
      res.send(data)
    })
    .catch(() => {
      res.status(400).send("Invalid input value")
    })

})

app.get("/:id", (req, res) => {
  const id = req.params.id;
  productService.findProductById(id)
    .then((data) => {
      res.send(data)
    })
    .catch(() => {
      res.status(404).send("Product not found")
    })

})


module.exports = app