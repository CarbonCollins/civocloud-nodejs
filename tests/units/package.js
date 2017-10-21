'use strict';
const Mocha = require('mocha');
const Chai = require('chai');

const Test = Mocha.Test;
const Suite = Mocha.Suite;
const expect = Chai.expect;

const CivoCloud = require('../../index');

const packageSuite = new Suite('civocloud-nodejs package test suite');

// ----- package export tests ----- //
const exportSuite = new Suite('Export tests');
exportSuite.addTest(new Test('CivoAPI exports class constructor', () => {
  expect(CivoCloud).to.be.an('function', 'package should export the CivoAPI class constructor');
}));
exportSuite.addTest(new Test('CivoAPI exports instanceSizes', () => {
  expect(CivoCloud.instanceSizes).to.be.an('object', 'package should export an object of instance sizes');
}));
packageSuite.addSuite(exportSuite);

// ----- package endpoint tests ----- //
const endpointSuite = new Suite('Endpoint tests');
endpointSuite.addTest(new Test('endpoint defaults to civo v2 api url', (done) => {
  try {
    const civo = new CivoCloud('noApiToken');
    expect(civo.endpoint).to.exist;
    expect(civo.endpoint).to.be.an('string', 'civo.endpoint should be a URL string');
    expect(civo.endpoint).to.be.equal('https://api.civo.com/v2', 'civo.endpoint URL should be "https://api.civo.com/v2"');
    done();
  } catch(err) {
    done(err);
  }
}));
endpointSuite.addTest(new Test('custom endpoint correctly defined', (done) => {
  try {
    const civo = new CivoCloud('noApiToken', 'customEndpoint');
    expect(civo.endpoint).to.exist;
    expect(civo.endpoint).to.be.an('string', 'civo.endpoint should be a URL string');
    expect(civo.endpoint).to.be.equal('customEndpoint', 'civo.endpoint URL should be "customEndpoint"');
    done();
  } catch(err) {
    done(err);
  }
}));
packageSuite.addSuite(endpointSuite);

// ----- api token tests ----- //
const apiTokenSuite = new Suite('API token tests');
apiTokenSuite.addTest(new Test('valid apiToken input', () => {
  const civo = new CivoCloud('noApiToken');
  expect(civo.apiToken).to.exist;
  expect(civo.apiToken).to.be.an('string', 'civo.apiToken should be a string');
  expect(civo.apiToken).to.be.equal('noApiToken', 'civo.apiToken does not match the inputted apiToken');
}));
apiTokenSuite.addTest(new Test('invalid apiToken input (undefined apiToken)', (done) => {
  try {
    const civoNoKey = new CivoCloud();
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
    const civoEmptyKey = new CivoCloud('');
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
packageSuite.addSuite(apiTokenSuite);

module.exports = () => { return packageSuite; };
