var expect = require('expect');

describe('ProductService', (suite) => {

  it('findProductsBySearch hout', (done) => {

    const productService = require('./ProductService');
    const req = {
      q: 'Hout',
      order: 'relevanceOrdered',
    };
    productService.findProductsBySearch(req)
      .then((json) => {
        //expect(json.count).toBe(935);
        expect(json.list.length).toBe(16);
        expect(json.list[0].title).toBeA('string');
        expect(json.list[0].text).toBeA('string');
        expect(json.list[0].image).toBeA('string');
        done();
      })
      .catch(done)
  }).timeout(5000);

  it('findProductsBySearch te', (done) => {

    const productService = require('./ProductService');
    const req = {
      q: 'Hout',
      order: 'relevanceOrdered',
      pageSize: 36
    };
    productService.findProductsBySearch(req)
      .then((json) => {
        //expect(json.count).toBe(3241);
        expect(json.list.length).toBe(36);
        expect(json.list[0].title).toBeA('string');
        expect(json.list[0].text).toBeA('string');
        expect(json.list[0].image).toBeA('string');
        done();
      })
      .catch(done)
  }).timeout(5000);

  it('findProductById ZH0670', (done) => {

    const productService = require('./ProductService');
    productService.findProductById('ZH0670')
      .then((json) => {
        expect(json.title).toBeA('string');
        expect(json.image).toBeA('string');

        done();
      })
      .catch(done)
  }).timeout(5000);

  it('findProductById PH9362', (done) => {

    const productService = require('./ProductService');
    productService.findProductById('PH9362')
      .then((json) => {
        expect(json.title).toBeA('string');
        expect(json.image).toBeA('string');

        done();
      })
      .catch(done)
  }).timeout(5000);

  it('findProductById DE0001', (done) => {

    const productService = require('./ProductService');
    productService.findProductById('DE0001')
      .then((json) => {
        expect(json.title).toBeA('string');
        expect(json.image).toBeA('string');

        done();
      })
      .catch(done)
  }).timeout(5000);

});