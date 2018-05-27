'use strict';

/**
 * @method InstanceRegionMixin
 * @private
 * @param {Class} SuperClass a superclass to apply the mixin too
 */
export default (SuperClass) => {
  /**
   * @class
   * @memberof module:CivoCloud/api
   * @augments module:CivoCloud/api.Civo
   * @see {@link https://www.civo.com/api/regions}
   */
  const InstanceRegion = class extends SuperClass {
    /**
     * @method module:CivoCloud/api.InstanceRegion~listRegions
     * @see {@link https://www.civo.com/api/regions#listing-available-regions}
     * @description gets an array of the currently available regions on civo cloud [GET]
     * @returns {Promise} a promise wich resolves with the available region list or rejects with an
     * error
     * @public
     */
    listRegions() {
      return this.getRequest('regions');
    }
  };
  return InstanceRegion;
};
