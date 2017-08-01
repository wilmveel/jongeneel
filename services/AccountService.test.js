const expect = require('expect');

const accountService = require('./AccountService');
const authService = require('./AuthService');

describe('accountService', () => {

  it('findAccount', (done) => {

    const username = 'WILLEM.VEELENTURF@FLOCK-SE.COM';
    const password = process.env.PASSWORD;

    authService.authenticate(username, password)
      .then((res) => {
        return accountService.findAccount(res.token)
      })
      .then((json) => {
        expect(json.name).toBe('Willem Veelenturf');
        done();
      })
      .catch(done)

  }).timeout(5000);

});