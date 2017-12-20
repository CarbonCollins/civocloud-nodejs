'use strict';
const Mocha = require('mocha');
const Chai = require('chai');

const Test = Mocha.Test;
const Suite = Mocha.Suite;
const expect = Chai.expect;

const civocloud = require('../../index');

const moduleSuite = new Suite('civocloud-nodejs module tests');

// ----- module export tests ----- //
const exportSuite = new Suite('Export tests');
exportSuite.addTest(new Test('CivoAPI exports class constructor', () => {
  expect(civocloud.Civo).to.be.an('function', 'module should export the CivoAPI class constructor');
}));
moduleSuite.addSuite(exportSuite);

// ----- module endpoint tests ----- //
const endpointSuite = new Suite('Endpoint tests');
endpointSuite.addTest(new Test('endpoint defaults to civo v2 api url', (done) => {
  try {
    const civo = new civocloud.Civo({ apiToken: 'noApiToken' });
    expect(civo.host).to.exist;
    expect(civo.host).to.be.an('string', 'civo.host should be a URL string');
    expect(civo.host).to.be.equal('https://api.civo.com/v2', 'civo.host URL should be "https://api.civo.com/v2"');
    expect(civo.port).to.exist;
    expect(civo.port).to.be.an('string', 'civo.port should be a port string');
    expect(civo.port).to.be.equal('443', 'civo.port default should be "443"');
    done();
  } catch(err) {
    done(err);
  }
}));
endpointSuite.addTest(new Test('custom host correctly defined', (done) => {
  try {
    const civo = new civocloud.Civo({ apiToken: 'noApiToken', host: 'customEndpoint' });
    expect(civo.host).to.exist;
    expect(civo.host).to.be.an('string', 'civo.host should be a URL string');
    expect(civo.host).to.be.equal('customEndpoint', 'civo.host URL should be "customEndpoint"');
    expect(civo.port).to.exist;
    expect(civo.port).to.be.an('string', 'civo.port should be a port string');
    expect(civo.port).to.be.equal('443', 'civo.port default should be "443"');
    done();
  } catch(err) {
    done(err);
  }
}));
endpointSuite.addTest(new Test('custom port correctly defined', (done) => {
  try {
    const civo = new civocloud.Civo({ apiToken: 'noApiToken', port: 8080 });
    expect(civo.host).to.exist;
    expect(civo.host).to.be.an('string', 'civo.host should be a URL string');
    expect(civo.host).to.be.equal('https://api.civo.com/v2', 'civo.host URL should be "https://api.civo.com/v2"');
    expect(civo.port).to.exist;
    expect(civo.port).to.be.an('string', 'civo.port should be a port string');
    expect(civo.port).to.be.equal('8080', 'civo.port default should be custom "8080"');
    done();
  } catch (err) {
    done(err);
  }
}));
moduleSuite.addSuite(endpointSuite);

// ----- api token tests ----- //
const apiTokenSuite = new Suite('API token tests');
apiTokenSuite.addTest(new Test('valid apiToken input', () => {
  const civo = new civocloud.Civo({ apiToken: 'noApiToken' });
  expect(civo.apiToken).to.exist;
  expect(civo.apiToken).to.be.an('string', 'civo.apiToken should be a string');
  expect(civo.apiToken).to.be.equal('noApiToken', 'civo.apiToken does not match the inputted apiToken');
}));
apiTokenSuite.addTest(new Test('invalid apiToken input (undefined apiToken)', (done) => {
  try {
    const civoNoKey = new civocloud.Civo();
    expect(civoNoKey.apiToken).to.not.exist;
    done(new Error('CivoAPI class did not throw an error when invalid apiToken was used'));
  } catch(err) {
    expect(err).to.exist;
    expect(err).to.be.instanceof(Error, 'creating a new instance without an apiToken should throw an error');
    expect(err.message).to.be.equal('invalid civo API key', 'error should throw an invalid civo API key');
    done();
  }
}));
apiTokenSuite.addTest(new Test('invalid apiToken input (defined empty apiToken)', (done) => {
  try {
    const civoEmptyKey = new civocloud.Civo({ apiToken: '' });
    expect(civoEmptyKey.apiToken).to.exist;
    expect(civoEmptyKey.apiToken).to.be.equal('', 'apiToken should be an empty string for test');
    done(new Error('CivoAPI class did not throw an error when invalid apiToken was used'));
  } catch(err) {
    expect(err).to.exist;
    expect(err).to.be.instanceof(Error, 'creating a new instance without an apiToken should throw an error');
    expect(err.message).to.be.equal('invalid civo API key', 'error should throw an invalid civo API key');
    done();
  }
}));
moduleSuite.addSuite(apiTokenSuite);

module.exports = () => { return moduleSuite; };
