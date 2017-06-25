jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

test('accountService', (done) => {
  const accountService = require('./AccountService');
  accountService.findAccount().then((json) => {
    expect(json.name).toBe("Bart Zijderlaan");
    done();
  })
});