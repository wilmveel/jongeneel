const fetch = require('node-fetch');
const HTMLParser = require('fast-html-parser');

function findAccount() {

  const url = `https://www.jongeneel.nl/snippets/userInfoBox`;
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
      const name = root.querySelector('.logout-box .user-info span').rawText.replace(/[\n\t]/g, '').trim();
      return {
        name
      }
    });
};

module.exports = {
  findAccount
};
