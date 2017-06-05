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
    require('./units/package/package')(expect, CivoCloud);
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

    describe('DNS API tests', () => { // ----- DNS TESTS
      require('./units/API/dns')(expect, eventEmitter, validCivo, invalidCivo, civoStub);
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
