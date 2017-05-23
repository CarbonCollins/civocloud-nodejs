'use strict';

const expect = require('chai').expect;

const CivoCloud = require('../index');

describe('civocloud-nodejs test suite', () => {
  before(() => {
    console.warn('Tests have not been written to fully cover code yet');
  });

  describe('package tests', () => {
    it('package exports CivoAPI class', () => {
      expect(CivoCloud).to.be.an('function', 'package should export the CivoAPI class constructor');
    });
    it('package defaults to civo v2 api url', () => {
      const civo = new CivoCloud('noApiToken');
      expect(civo.endpoint).to.exist;
      expect(civo.endpoint).to.be.an('string', 'civo.endpoint should be a URL string');
      expect(civo.endpoint).to.be.equal('https://api.civo.com/v2', 'civo.endpoint URL should be "https://api.civo.com/v2"');
    });
    it('package apiToken tests', () => {
      const civo = new CivoCloud('noApiToken');
      expect(civo.apiToken).to.exist;
      expect(civo.apiToken).to.be.an('string', 'civo.apiToken should be a string');
      expect(civo.apiToken).to.be.equal('noApiToken', 'civo.apiToken does not match the inputted apiToken');

      try {
        const civoNoKey = new CivoCloud();
        expect(civoNoKey.apiToken).to.not.exist;
      } catch(err) {
        expect(err).to.exist;
        expect(err).to.be.instanceof(Error, 'creating a new instance without an apiToken should throw an error');
        expect(err.message).to.be.equal('invalid civo API key', 'error should throw an invalid civo API key');
      }

      try {
        const civoEmptyKey = new CivoCloud('');
        expect(civoEmptyKey.apiToken).to.not.exist;
      } catch(err) {
        expect(err).to.exist;
        expect(err).to.be.instanceof(Error, 'creating a new instance without an apiToken should throw an error');
        expect(err.message).to.be.equal('invalid civo API key', 'error should throw an invalid civo API key');
      }
    });
  });

  // describe('API tests', () => {
  //   it('auto fail as no tests written', () => {
  //     expect(true).to.be.equal(false, 'no tests written yet');
  //   });
  // });
});