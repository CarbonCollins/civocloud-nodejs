'use strict';

/**
 * @method QuotaMixin
 * @private
 * @param {Class} SuperClass a superclass to apply the mixin too
 */
export default (SuperClass) => {
  /**
   * @class
   * @memberof module:CivoCloud/api
   * @augments module:CivoCloud/api.Civo
   * @see {@link https://www.civo.com/api/quota}
   */
  const Quota = class extends SuperClass {
    /**
     * @method module:CivoCloud/api.Quota~getQuota
     * @see {@link https://www.civo.com/api/quota#determining-current-quota}
     * @description gets an object of quota values [GET]
     * @returns {Promise}
     * @public
     */
    getQuota() {
      return this.getRequest('quota');
    }
  };
  return Quota;
};
