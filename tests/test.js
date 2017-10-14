const Mocha = require('mocha');
const { Suite } = Mocha;

const packageUnitTests = require('./units/package');
const apiUnitTests = require('./units/api');


const mocha = new Mocha();

const fullSuite = Suite.create(mocha.suite, 'civocloud-nodejs full test suite');

Promise.resolve()
  .then(packageUnitTests)
  .then((suite) => { return fullSuite.addSuite(suite); })
  .then(apiUnitTests)
  .then((suite) => { return fullSuite.addSuite(suite); })
  .then(() => { return mocha.run(); })
  .catch((err) => {
    console.error(err);
  });
// fullSuite.addSuite(require('./units/package'));
// fullSuite.addSuite(require('./units/api'));

// mocha.run();
