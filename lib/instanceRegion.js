'use strict';

const instanceRegionMixin = (SuperClass) => {
  /**
   * @mixin InstanceRegionAPI
   */
  return class InstanceRegionAPI extends SuperClass {
    /**
     * @method InstanceRegionAPI~listRegions
     * @desc gets an array of the currently available regions on civo cloud
     * @returns {Promise} a promise wich resolves with the available region list or rejects with an
     * error
     * @public
     */
    listRegions() {
      return this.getRequest('regions');
    }
  };
}

module.exports = instanceRegionMixin;
