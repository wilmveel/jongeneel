const expect = require('expect');

const authService = require('./AuthService');
const cartService = require('./CartService');

const username = 'WILLEM.VEELENTURF@FLOCK-SE.COM';
const password = process.env.PASSWORD;

describe('cartService', () => {

  it('find cart not authenticated', (done) => {

    cartService.findAll()
      .catch((e) => {
        expect(e.message).toBe('Not authenticated');
        done()
      })

  }).timeout(5000);

  it('find cart authenticated', (done) => {

    authService.authenticate(username, password)
      .then((res) => {
        cartService.findAll(res.token)
          .then((json) => {
            expect(json.length).toBeA('number');
            done();
          })
          .catch(done)
      })
      .catch(done)

  }).timeout(5000);

  it('add product to cart authenticated', (done) => {

    authService.authenticate(username, password)
      .then((res) => {
        cartService.addVariant('8711438064527', 1, res.token)
          .then((json) => {
            return cartService.findAll(res.token)
          })
          .then((json) => {
            expect(json.length).toBeA('number');
            expect(json[0].amount).toBeA('number');
            return done();
          })
          .catch(done)
      })
      .catch(done)

  }).timeout(5000);


});