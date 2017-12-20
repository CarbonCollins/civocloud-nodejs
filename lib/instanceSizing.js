'use strict';

/**
 * @method InstanceSizingMixin
 * @private
 * @param {Class} SuperClass a superclass to apply the mixin too
 */
const InstanceSizingMixin = (SuperClass) => {
  /**
   * @class
   * @memberof module:CivoCloud/api
   * @augments module:CivoCloud/api.Civo
   * @see {@link https://www.civo.com/api/sizes}
   */
  const InstanceSizing = class extends SuperClass {
    /**
     * @method module:CivoCloud/api.InstanceSizing~listInstanceSizes
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
  return InstanceSizing;
};

module.exports = InstanceSizingMixin;
