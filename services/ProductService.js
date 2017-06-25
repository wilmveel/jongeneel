const fetch = require('node-fetch');
const HTMLParser = require('fast-html-parser');

function findProductsBySearch(q) {

  const url = `https://www.jongeneel.nl/search?text=${q}`;
  const opts = {
    headers: {
      'Cookie': 'JSESSIONID=5A65E0CCBE985460BE625B35CA3DCFE1;',
    }
  };

  return fetch(url, opts)
    .then((res) => {
      return res.text();
    })
    .then((html) => {
      const root = HTMLParser.parse(html);
      const count = root.querySelector('.pagination-bar p').firstChild.rawText.replace(' Product(en) gevonden', '');
      const list = root.querySelectorAll('.product-list li').map((x) => {
        return {
          id: x.querySelector('.text-holder p').rawText.replace(/[\n\t]/g, '').replace('Artikelnummer', ''),
          title: x.querySelector('.text-holder h2 a').rawText.replace(/[\n\t]/g, ''),
          text: x.querySelectorAll('.text-holder p')[1].rawText.replace(/[\n\t]/g, ''),
          image: x.querySelector('a img').attributes['src'],
        };
      });

      return {
        count : parseInt(count), list
      }
    });
}

function findProductById(id) {

  const url = `https://www.jongeneel.nl/producten/-/-/-/-/p/${id}`;
  const opts = {
    headers: {
      'Cookie': 'JSESSIONID=59BB9D002FCD278A14FF1EEA59B41FC6;',
    }
  };

  return fetch(url, opts)
    .then((res) => {
      return res.text();
    })
    .then((html) => {
      const root = HTMLParser.parse(html);
      return {
        id,
        title: root.querySelector('#main .title-block h1').rawText.replace(` (${id})`, ''),
        image: root.querySelector('#main #tab1 img').attributes['src'],
        information: root.querySelectorAll('#main #tab1 p')
          .filter((x) => x.rawText.trim())
          .reduce((acc, x) => acc + "<p>" + x.rawText.trim() + "</p>", '' ),
        processing: root.querySelectorAll('#main #tab3 p')
          .filter((val) => val.rawText.trim())
          .reduce((acc, x) => acc + "<p>" + x.rawText.trim() + "</p>", '' ),
        variants: root.querySelectorAll('#main #addToCartForm .variantSeachTable tr').map((x) => {
          const data = x.querySelectorAll("td");
          return {
            size: data[0].rawText.trim(),
            price: data[1].rawText.trim(),
            per: data[2].rawText.trim(),
            delivery: data[3].rawText.trim(),
          };
        })
      }
    });
}

module.exports = {
  findProductsBySearch,
  findProductById,
};
