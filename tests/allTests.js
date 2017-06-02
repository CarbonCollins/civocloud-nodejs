'use strict';

const expect = require('chai').expect;
const EventEmitter = require('promise-once-events');

const CivoAPIStub = require('./stubs/civoAPI');
const CivoCloud = require('../index');
const eventEmitter = new EventEmitter();

const civoStub = new CivoAPIStub(eventEmitter);
civoStub.listen(3000);

describe('civocloud-nodejs test suite', () => {
  describe('package tests', () => {
    it('package exports CivoAPI class', () => {
      expect(CivoCloud).to.be.an('function', 'package should export the CivoAPI class constructor');
    });
    describe('package endpoint tests', () => {
      it('endpoint defaults to civo v2 api url', (done) => {
        try {
          const civo = new CivoCloud('noApiToken');
          expect(civo.endpoint).to.exist;
          expect(civo.endpoint).to.be.an('string', 'civo.endpoint should be a URL string');
          expect(civo.endpoint).to.be.equal('https://api.civo.com/v2', 'civo.endpoint URL should be "https://api.civo.com/v2"');
          done();
        } catch(err) {
          done(err);
        }
      });
      it('custom endpoint correctly defined', (done) => {
        try {
          const civo = new CivoCloud('noApiToken', 'customEndpoint');
          expect(civo.endpoint).to.exist;
          expect(civo.endpoint).to.be.an('string', 'civo.endpoint should be a URL string');
          expect(civo.endpoint).to.be.equal('customEndpoint', 'civo.endpoint URL should be "customEndpoint"');
          done();
        } catch(err) {
          done(err);
        }
      });
    });
    describe('package apiToken tests', () => {
      it('valid apiToken input test', () => {
        const civo = new CivoCloud('noApiToken');
        expect(civo.apiToken).to.exist;
        expect(civo.apiToken).to.be.an('string', 'civo.apiToken should be a string');
        expect(civo.apiToken).to.be.equal('noApiToken', 'civo.apiToken does not match the inputted apiToken');
      });
      it('invalid apiToken input test (undefined apiToken)', (done) => {
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
      });
      it('invalid apiToken input test (defined empty apiToken)', (done) => {
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
      });
    });
  });

  describe('API tests', () => {
    const validCivo = new CivoCloud('validAPIKey', 'http://localhost:3000');
    const invalidCivo = new CivoCloud('invalidAPIKey', 'http://localhost:3000');

    describe('SSH Keys API tests', () => { // ----- SSH KEYS TESTS
      require('./units/API/sshKeys')(expect, eventEmitter, validCivo, invalidCivo, civoStub);
    });

    describe('Instance API tests', () => { // ----- INSTANCE API TESTS
      require('./units/API/instances')(expect, eventEmitter, validCivo, invalidCivo, civoStub);
    });

    describe('Network API tests', () => { // ----- NETWORK API TESTS
      require('./units/API/network')(expect, eventEmitter, validCivo, invalidCivo, civoStub);
    });

    describe('Snapshot API tests', () => { // ----- SNAPSHOT API TESTS
      require('./units/API/snapshot')(expect, eventEmitter, validCivo, invalidCivo, civoStub);
    });

    describe('Firewall API tests', () => { // ----- FIREWALL TESTS
      require('./units/API/firewall')(expect, eventEmitter, validCivo, invalidCivo, civoStub);
    });

    describe('Instance Sizing API tests', () => { // ----- INSTANCE SIZING TESTS
      require('./units/API/instanceSizing')(expect, eventEmitter, validCivo, invalidCivo, civoStub);
    });

    describe('Instance Regions API tests', () => { // ----- INSTANCE REGIONS TESTS
      require('./units/API/instanceRegion')(expect, eventEmitter, validCivo, invalidCivo, civoStub);
    });

    describe('Instance Template API tests', () => { // ----- INSTANCE TEMPLATE TESTS
      require('./units/API/instanceTemplate')(expect, eventEmitter, validCivo, invalidCivo, civoStub);
    });

    describe('Account Quota API tests', () => { // ----- QUOTA TESTS
      require('./units/API/quotas')(expect, eventEmitter, validCivo, invalidCivo, civoStub);
    });
  
    describe('Account Charges API tests', () => { // ----- ACCOUNT CHARGES TESTS
      require('./units/API/charges')(expect, eventEmitter, validCivo, invalidCivo, civoStub);
    });

  });
});
