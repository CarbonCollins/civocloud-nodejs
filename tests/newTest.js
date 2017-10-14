const Mocha = require('mocha');
const { Test, Suite } = Mocha;

const mocha = new Mocha();

const tlSuite = Suite.create(mocha.suite, 'civocloud-nodejs test suite');

const slSuite = new Suite('some suite');

tlSuite.addSuite(slSuite);

tlSuite.addTest(new Test('test case', (done) => {
  done();
}));

slSuite.addTest(new Test('test case 2', (done) => {
  done();
}));

mocha.run();


/*

const Mocha = require('mocha');
var Test = Mocha.Test;
var Suite = Mocha.Suite;

var mocha = new Mocha();
var suite = Suite.create(mocha.suite, 'My test suite with dynamic test cases');

lineReader.on('line', function (line) {
    suite.addTest(new Test(line, function () {
        return true;
    }));
})
    .on('close', function () {
        mocha.run();
    });

 */