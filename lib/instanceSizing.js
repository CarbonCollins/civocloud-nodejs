
/**
 * @mixin
 * @desc provides instance sizing API calls as a mixin so is not intended to be used directly
 * @param {Class} SuperClass 
 */
const instanceSizingMixin = (SuperClass) => {
  /**
   * @class
   */
  return class InstanceSizingAPI extends SuperClass {
    /**
     * @method InstanceSizingAPI~listInstanceSizes
     * @desc gets an array of the currently available instance sizes on civo cloud
     * @returns {Promise} a promise wich resolves with the instance size list or rejects with an
     * error
     */
    listInstanceSizes() {
      return this.getRequest('sizes');
    }
  };
}

module.exports = instanceSizingMixin;
