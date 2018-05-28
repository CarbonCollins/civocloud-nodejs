/* eslint prefer-arrow-callback: "off" */
/* eslint no-unused-expressions: "off" */

import { expect } from 'chai';

import documentationSuite from './documentation/suite';

import * as Module from '../index';

describe('civocloud-nodejs full test suite', function rootSuite() {
  describe('documentation tests', documentationSuite);
  describe('module export tests', function moduleExportsSuite() {
    it('exports module', function shouldExportModule() {
      expect(Module).to.exist;
      expect(Module).to.be.a('object');
      expect(Module).to.have.all.keys([
        'Civo',
        'chargesMixin',
        'domainMixin',
        'firewallMixin',
        'instanceMixin',
        'instanceRegionMixin',
        'instanceSizingMixin',
        'loadBallancerMixin',
        'networkMixin',
        'quotaMixin',
        'snapshotMixin',
        'sshKeyMixin',
        'templateMixin',
        'webhookMixin'
      ]);
    });
  });
});
