const url = require('url');
const fetch = require('node-fetch');
const HTMLParser = require('fast-html-parser');

function findProductsBySearch(req, token) {

  const query = {
    text: req.q,
    pageSize: req.pageSize || 16,
    page: req.page || 0,
    q: req.q + ':' + req.order,
    type: 'product'
  };

  const urlObj = {
    protocol: 'https',
    host: 'www.jongeneel.nl',
    pathname: '/search',
    query: query
  };

  const opts = {
    headers: {
      'Cookie': 'JSESSIONID=' + token + ';',
    }
  };

  const location = url.format(urlObj);
  return fetch(location, opts)
    .then((res) => {
      return res.text();
    })
    .then((html) => {
      const root = HTMLParser.parse(html);
      //const count = root.querySelector('.pagination-bar p').firstChild.rawText.replace(' Product(en) gevonden', '').replace('.', '');
      const list = root.querySelectorAll('#product-search .product-list-item').map((x) => {
        const image = x.querySelector('.product-list-item-img');
        const details = x.querySelector('.product-list-item-details');
        return {
          id: details.querySelector('.product-list-item-art').rawText.trim().replace('Artikelnummer', ''),
          title: details.querySelector('h2 a').rawText.trim(),
          text: details.querySelector('.product-specs-list').rawText.trim(),
          image: image.querySelector('img').attributes['src'],
        };
      });

      return {
        count: 0,
        list: list
      }
    });
}

function findProductById(id) {

  const href = `https://www.jongeneel.nl/producten/WEBSHOP?q=${id.trim()}&group=false&pageSize=1000&view=order`;
  const opts = {
    headers: {
      'Cookie': 'JSESSIONID=59BB9D002FCD278A14FF1EEA59B41FC6;',
    }
  };

  return fetch(href, opts)
    .then((res) => {
      return res.text();
    })
    .then((html) => {
      const root = HTMLParser.parse(html);
      const main = root.querySelector('#main');
      return {
        id,
        title: main.querySelector('.title-block h1').rawText.replace(` (${id})`, ''),
        image: main.querySelector('.product-img img').attributes['src'],
        // information: root.querySelectorAll('#tab1 p')
        //   .filter((x) => x.rawText.trim())
        //   .reduce((acc, x) => acc + "<p>" + x.rawText.trim() + "</p>", ''),
        // processing: root.querySelectorAll('#tab3 p')
        //   .filter((val) => val.rawText.trim())
        //   .reduce((acc, x) => acc + "<p>" + x.rawText.trim() + "</p>", ''),
        // variants: root.querySelectorAll('#addToCartForm .variantSeachTable tr').map((x) => {
        //   const data = x.querySelectorAll("td");
        //   return {
        //     size: data[0].rawText.trim(),
        //     price: data[1].rawText.trim(),
        //     per: data[2].rawText.trim(),
        //     delivery: data[3].rawText.trim(),
        //   };
        // })
      }
    });
}

module.exports = {
  findProductsBySearch,
  findProductById,
};
