var expect = require('expect');

describe('FacetService', () => {

  it('findFacetsBySearchTerm hout', (done) => {

    const facetService = require('./FacetService');

    const req = {
      q: 'Hout',
      order: 'relevanceOrdered',
    };

    facetService.findFacetsBySearchTerm(req)
      .then((json) => {
        //expect(json.count).toBe(935);
        expect(json.length).toBe(5);
        expect(json[0].name).toBeA('string');
        expect(json[0].values).toBeA('array');
        done();
      })
      .catch(done)
  }).timeout(5000);

});