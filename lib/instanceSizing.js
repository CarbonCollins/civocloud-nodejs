'use strict';

const instanceSizingMixin = (SuperClass) => {
  /**
   * @mixin InstanceSizingAPI
   */
  return class InstanceSizingAPI extends SuperClass {
    /**
     * @method InstanceSizingAPI~listInstanceSizes
     * @desc gets an array of the currently available instance sizes on civo cloud
     * @returns {Promise} a promise wich resolves with the instance size list or rejects with an
     * error
     * @public
     */
    listInstanceSizes() {
      return this.getRequest('sizes');
    }
  };
}

module.exports = instanceSizingMixin;
