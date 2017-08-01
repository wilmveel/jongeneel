const fetch = require('node-fetch');
const HTMLParser = require('fast-html-parser');

function findAccount(token) {

  const href = `https://www.jongeneel.nl/snippets/userInfoBox`;
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

      if(root.querySelector('.login-form'))
        throw new Error('Not authenticated')

      const name = root.querySelector('.logout-box .user-info span').rawText.replace(/[\n\t]/g, '').trim();
      return {
        name
      }
    });
};

module.exports = {
  findAccount
};
