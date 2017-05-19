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
  });

  describe('API tests', () => {
    it('auto fail as no tests written', () => {
      expect(true).to.be.equal(false, 'no tests written yet');
    });
  });
});