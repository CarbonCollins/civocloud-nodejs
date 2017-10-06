/**
 * @name CivoAPI
 * @description all of the Civo API functions
 */

const CivoRequest = require('./request');

const domainMixin = require('./domain');
const firewallMixin = require('./firewall');
const instanceMixin = require('./instance');
const instanceRegionMixin = require('./instanceRegion');
const instanceSizingMixin = require('./instanceSizing');
const networkMixin = require('./network');
const snapshotMixin = require('./snapshot');
const sshKeyMixin = require('./sshKeys');
const templateMixin = require('./template');

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

module.exports = class CivoAPI extends mix(CivoRequest).with(
  domainMixin,
  firewallMixin,
  instanceMixin,
  instanceRegionMixin,
  instanceSizingMixin,
  networkMixin,
  snapshotMixin,
  sshKeyMixin,
  templateMixin
) {
  constructor(...args) {
    super(...args);
  }
};
