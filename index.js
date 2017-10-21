'use strict';
/**
 * @name CivoAPI
 * @description all of the Civo API functions
 */

const CivoRequest = require('./lib/request');

const chargesMixin = require('./lib/charges');
const domainMixin = require('./lib/domain');
const firewallMixin = require('./lib/firewall');
const instanceMixin = require('./lib/instance');
const instanceRegionMixin = require('./lib/instanceRegion');
const instanceSizingMixin = require('./lib/instanceSizing');
const networkMixin = require('./lib/network');
const quotaMixin = require('./lib/quota');
const snapshotMixin = require('./lib/snapshot');
const sshKeyMixin = require('./lib/sshKeys');
const templateMixin = require('./lib/template');

const mix = (Superclass) => {
  return new MixinBuilder(Superclass);
};

class MixinBuilder {
  constructor(Superclass) {
    this.superclass = Superclass;
  }

  with(...mixins) {
    return mixins.reduce((c, mixin) => { return mixin(c); }, this.superclass);
  }
}

class CivoAPI extends mix(CivoRequest).with(
  chargesMixin,
  domainMixin,
  firewallMixin,
  instanceMixin,
  instanceRegionMixin,
  instanceSizingMixin,
  networkMixin,
  quotaMixin,
  snapshotMixin,
  sshKeyMixin,
  templateMixin
) {
  constructor(...args) {
    super(...args);
  }
}

module.exports = CivoAPI;
module.exports.instanceSizes = instanceMixin.instanceSizes;
