const url = require('url');

const fetch = require('node-fetch');
const HTMLParser = require('fast-html-parser');

function findFacetsBySearchTerm(req, token) {

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
      const facets = root.querySelector('#facets');
      return facets.querySelectorAll('.facet').map(facet => {
        return {
          name: facet.querySelector('.facetHead').rawText.trim(),
          values: facet.querySelectorAll('.facetValues li').map(value => {
            return {
              name : value.querySelector('a') ? value.querySelector('a').rawText.trim() : value.querySelector('form label').childNodes[2].text.trim(),
              count : value.querySelector('.facetValueCount').rawText.trim().replace('(', '').replace(')', '')
            }
          })
        }
      })

      return {
        count: 0,
        list: list
      }
    });
}

module.exports = {
  findFacetsBySearchTerm,
};
