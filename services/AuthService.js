const querystring = require('querystring');
const fetch = require('node-fetch');
const HTMLParser = require('fast-html-parser');

function getToken() {
  const href = `https://www.jongeneel.nl/j_spring_security_check`;
  return fetch(href)
    .then((res) => {
      const token = res.headers.get('set-cookie').match(/JSESSIONID=(.*); Path=\/; HttpOnly/)[1]
      return token;
    })
}

function authenticate(username, password) {

  return getToken().then((token) => {

    const href = `https://www.jongeneel.nl/j_spring_security_check`;
    const form = {
      'login-type': 'normal',
      'j_username': username,
      'j_password': password,
    };
    const opts = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': `JSESSIONID=${token};`,
      },
      body: querystring.stringify(form),
    };

    return fetch(href, opts).then((res) => {

      return res.text().then((html) => {
        const root = HTMLParser.parse(html);

        const titleBlock = root.querySelector('.title-block');

        if (titleBlock && titleBlock.rawText.trim() === 'Aanmelden') {
          throw new Error(`Could not authenticate`);
        }

        if (root.querySelector('#userInfoBoxWrapper')) {
          return {
            token: token
          }
        }

      });
    });
  });
};

module.exports = {
  authenticate
};