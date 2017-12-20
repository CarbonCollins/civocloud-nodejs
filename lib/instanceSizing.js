'use strict';

const instanceSizingMixin = (SuperClass) => {
  /**
   * @mixin InstanceSizingAPI
   */
  return class InstanceSizingAPI extends SuperClass {
    /**
     * @method InstanceSizingAPI~listInstanceSizes
     * @see {@link https://www.civo.com/api/sizes#listing-available-sizes}
     * @description gets an array of the currently available instance sizes on civo cloud [GET]
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
