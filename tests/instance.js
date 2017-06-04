'use strict';

const expect = require('chai').expect;
const EventEmitter = require('promise-once-events');

const CivoAPIStub = require('./stubs/civoAPI');
const CivoCloud = require('../index');
const eventEmitter = new EventEmitter();

const civoStub = new CivoAPIStub(eventEmitter);
civoStub.listen(3000);

describe('civocloud-nodejs instance test suite', () => {
  describe('API tests', () => {
    const validCivo = new CivoCloud('validAPIKey', 'http://localhost:3000');
    const invalidCivo = new CivoCloud('invalidAPIKey', 'http://localhost:3000');

    describe('Instance API tests', () => { // ----- INSTANCE API TESTS
      require('./units/API/instances')(expect, eventEmitter, validCivo, invalidCivo, civoStub);
    });

  });
});
