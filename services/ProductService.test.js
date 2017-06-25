test('findProductsBySearch hout', (done) => {
  const productService = require('./ProductService');
  productService.findProductsBySearch('Hout').then((json) => {
    expect(json.count).toBe(935);
    expect(json.list.length).toBe(18);
    done();
  })
});

test('findProductsBySearch te', (done) => {
  const productService = require('./ProductService');
  productService.findProductsBySearch('te').then((json) => {
    expect(json.count).toBe(3241);
    expect(json.list.length).toBe(18);
    done();
  })
});

test('findProductsBySearch hout', (done) => {
  const productService = require('./ProductService');
  productService.findProductById('ZH0101').then((json) => {
    expect(json.title).toBe("VUREN HOUT KL.C GESCHAAFD RECHTE HOEK FSC MIX 70%");
    done();
  })
});