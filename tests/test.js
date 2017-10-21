const Mocha = require('mocha');
const Suite = Mocha.Suite;

const packageUnitTests = require('./units/package');
const apiUnitTests = require('./units/api');


const mocha = new Mocha();

const fullSuite = Suite.create(mocha.suite, 'civocloud-nodejs full test suite');

Promise.resolve()
  .then(() => { return packageUnitTests(); })
  .then((suite) => { return fullSuite.addSuite(suite); })
  .then(() => { return apiUnitTests(); })
  .then((suite) => { return fullSuite.addSuite(suite); })
  .then(() => { return mocha.run(); })
  .catch((err) => {
    console.error(err);
  });
