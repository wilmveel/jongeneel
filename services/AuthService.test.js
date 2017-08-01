const expect = require('expect');

const authService = require('./AuthService');

describe('authService', () => {

  it('should authenticate with valid credentials', (done) => {
    const username = 'WILLEM.VEELENTURF@FLOCK-SE.COM';
    const password = process.env.PASSWORD;

    authService.authenticate(username, password)
      .then((json) => {
        expect(json.token).toBeA('string');
        done();
      })
      .catch(done)

  }).timeout(5000);

  it('should not authenticate with invalid credentials', (done) => {
    const username = 'WILLEM.VEELENTURF@FLOCK-SE.COM';
    const password = '123456';

    authService.authenticate(username, password)
      .catch((e) => {
        expect(e.message).toBe('Could not authenticate for user WILLEM.VEELENTURF@FLOCK-SE.COM');
        done()
      })

  }).timeout(5000);

});