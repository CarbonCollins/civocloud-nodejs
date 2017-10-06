
/**
 * @mixin
 * @desc provides instance region API calls as a mixin so is not intended to be used directly
 * @param {Class} SuperClass 
 */
const instanceRegionMixin = (SuperClass) => {
  /**
   * @class
   */
  return class InstanceRegionAPI extends SuperClass {
    /**
     * @method InstanceRegionAPI~listRegions
     * @desc gets an array of the currently available regions on civo cloud
     * @returns {Promise} a promise wich resolves with the available region list or rejects with an
     * error
     */
    listRegions() {
      return this.__getRequest('regions');
    }
  };
}

module.exports = instanceRegionMixin;
