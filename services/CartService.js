const querystring = require('querystring');
const fetch = require('node-fetch');
const HTMLParser = require('fast-html-parser');

function findAll(token) {

  if(!token)
    return Promise.reject(new Error('Not authenticated'));

  const href = `https://www.jongeneel.nl/cart`;
  const opts = {
    headers: {
      'Cookie': `JSESSIONID=${token};`,
    }
  };

  return fetch(href, opts)
    .then((res) => {
      return res.text();
    })
    .then((html) => {
      const root = HTMLParser.parse(html);

      const cartPage = root.querySelector('.cart-page');

      const emptyCart = cartPage.querySelector('p');
      if(emptyCart && emptyCart.rawText.trim() === 'Uw winkelwagen is leeg'){
        return [];
      }

      const listCart = cartPage.querySelectorAll('#your_cart tbody tr');
      if(listCart){
        return listCart.map((row) => {
          return {
            title: row.querySelector('.title').rawText,
            amount: parseInt(row.querySelectorAll('input.qty')[0].rawAttrs.match(/value="([^"]*)/)[1]),
          }
        });
      }

    });
};

function addVariant(variant, amount ,token) {

  if(!token)
    throw new Error('Not authenticated');

  const href = `https://www.jongeneel.nl/v/${variant}/add`;

  const form = {};
  //form[`orderQuantities[${variant}].outOfStock`] = false;
  form[`orderQuantities[${variant}].value`] = amount;

  const opts = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Cookie': `JSESSIONID=${token};`,
    },
    body: querystring.stringify(form),
  };

  return fetch(href, opts)
    .then((res) => {
      return res.text();
    })
    .then((html) => {
      return;
    });
};

module.exports = {
  findAll, addVariant
};
